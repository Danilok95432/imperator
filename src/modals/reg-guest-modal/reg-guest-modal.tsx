/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { FormProvider, type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'

import styles from './index.module.scss'
import { type FC, useEffect, useRef, useState } from 'react'
import { type RegGuestInputs, regGuestSchema } from './schema'
import { InfoSection } from './components/InfoSection/InfoSection'
import { VisitSection } from './components/VisitSection/VisitSection'
import { DatesSection } from './components/DatesSection/DatesSection'
import { RegionSection } from './components/RegionSection/RegionSection'

import { toast } from 'react-toastify'
import { useActions } from 'src/app/store/hooks/actions'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import {
	useGetCityByRegionQuery,
	useGetInfoRegistationQuery,
	useGetRegionsByValueQuery,
	useSendRegistrationGuestFormMutation,
} from 'src/features/auth/api/auth.api'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { booleanToNumberString, formatDateRange, mainFormatDate } from 'src/shared/helpers/utils'
import { LogoModalMobileSVG } from 'src/shared/ui/icons/logoModalMobileSVG'
import { LogoModalSVG } from 'src/shared/ui/icons/logoModalSVG'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { GuestFields } from './components/InfoSection/components/GuestFields/GuestFields'
import { useLocation } from 'react-router-dom'

type RegEventGuestModalProps = {
	id: string
}

export const RegEventGuestModal: FC<RegEventGuestModalProps> = ({ id }) => {
	const { closeModal } = useActions()
	const modalRef = useRef<HTMLDivElement>(null)
	const { data: eventDataInfo } = useGetEventByIdQuery('1')
	const { data: selectOptions } = useGetInfoRegistationQuery('1')
	const { data: regions } = useGetRegionsByValueQuery(' ')
	const [isCodeAccepted, setIsCodeAccepted] = useState(false)
	const [sendRegForm] = useSendRegistrationGuestFormMutation()
	const [errorForm, setErrorForm] = useState<string>('')
	const breakPoint = useBreakPoint()

	const location = useLocation()

	const methods = useForm<RegGuestInputs>({
		mode: 'onBlur',
		resolver: yupResolver(regGuestSchema),
		defaultValues: {
			group_list: [],
			cars_list: [],
		},
	})

	const [lockSearch, setLockSearch] = useState<boolean>(false)

	const regionValue = useWatch({
		control: methods.control,
		name: 'id_region',
	})

	const cityValue =
		useWatch({
			control: methods.control,
			name: 'id_city',
		}) || ''

	const regionId = regions?.regions?.find((reg) => reg.label === regionValue)?.value

	const { data: citys } = useGetCityByRegionQuery(
		{
			region: regionId ?? '',
			city: cityValue,
		},
		{
			skip: !regionId || cityValue.length <= 2 || lockSearch,
		},
	)

	const onSubmit: SubmitHandler<RegGuestInputs> = async (data) => {
		const region = regions?.regions.filter((reg) => reg.label === data.id_region)[0].value
		const city = citys?.citys?.filter((nas) => nas.label === data.id_city)[0].value
		const formData = new FormData()
		formData.append('id_reg_type', '1')
		formData.append('id_event', id)
		formData.append('surname', data.surname)
		formData.append('firstname', data.firstname)
		formData.append('fathname', data.fathname ?? '')
		formData.append('age', data.age)
		formData.append('id_region', region ?? '')
		formData.append('id_city', city ?? '')
		formData.append('phone', data.phone)
		formData.append('email', data.email ?? '')
		formData.append('use_group', booleanToNumberString(data.use_group))
		formData.append('group_count', data.group_list?.length.toString() ?? '')
		data.group_list?.forEach((group, index) => {
			formData.append(`group_list_age[${index}]`, group.age ?? '')
			formData.append(`group_list_surname[${index}]`, group.surname ?? '')
			formData.append(`group_list_firstname[${index}]`, group.firstname ?? '')
			formData.append(`group_list_fathname[${index}]`, group.fathname ?? '')
		})
		formData.append('use_car', booleanToNumberString(data.use_car))
		if (data.use_car) {
			formData.append('cars_count', data.cars_count ?? '')
			data.cars_list?.forEach((car, index) => {
				formData.append(`cars_list_car_type[${index}]`, car.car_type)
				formData.append(`cars_list_car_number[${index}]`, car.car_number)
			})
		}
		formData.append('use_lager', booleanToNumberString(data.use_lager))
		if (data.use_lager) {
			formData.append('id_lager_type', data.id_lager_type ?? '')
			formData.append('lager_count', data.lager_count ?? '')
		}
		formData.append('data_zaezd', data.data_zaezd ?? '')
		formData.append('data_viezd', data.data_viezd ?? '')
		if (city === '' || city === undefined) {
			formData.append('city_name', data.id_city)
		}

		try {
			if (isCodeAccepted) {
				const res = (await sendRegForm(formData)) as unknown as {
					data: { status: string; errortext: string; ticket_link?: string }
				}
				if (res.data.status === 'ok') {
					toast.success('Регистрация прошла успешно!', {
						position: 'bottom-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
					if (location.pathname.includes('/terminal')) {
						if (
							res.data.ticket_link &&
							res.data.ticket_link !== '' &&
							res.data.ticket_link.startsWith('http')
						) {
							window.location.href = res.data.ticket_link
						}
					}
					closeModal()
				} else {
					toast.error('Произошла ошибка при регистрации', {
						position: 'bottom-right',
					})
					setErrorForm(res.data.errortext)
				}
			}
		} catch (error) {
			console.error('Unexpected error:', error)
		}
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (window.innerWidth < 768) return

			const modalEl = modalRef.current
			const target = event.target as HTMLElement

			if (!modalEl || modalEl.contains(target)) return

			const { clientX, clientY } = event
			const windowWidth = window.innerWidth
			const windowHeight = window.innerHeight
			const scrollbarSize = 16
			const isClickOnScrollbar =
				clientX >= windowWidth - scrollbarSize || clientY >= windowHeight - scrollbarSize

			if (isClickOnScrollbar) return

			closeModal()
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [closeModal])

	return (
		<div className={styles.regModal} ref={modalRef}>
			<div className='modal-content'>
				<div className={styles.modalContent}>
					{breakPoint === 'S' ? <LogoModalMobileSVG /> : <LogoModalSVG />}
					<h2>{eventDataInfo?.title}</h2>
					<FlexRow className={styles.eventInfoLine}>
						<p className={styles.infoString}>
							{eventDataInfo?.date && eventDataInfo.date.length > 1
								? formatDateRange(eventDataInfo?.date as [Date, Date])
								: mainFormatDate(eventDataInfo?.date[0])}
						</p>
						<div className={styles.dot}></div>
						<p className={styles.infoString}>{eventDataInfo?.location.address.split(',')[0]}</p>
						<div className={cn(styles.dot, styles._red)}></div>
						<p className={cn(styles.ageRating, styles.infoString)}>{eventDataInfo?.ageRating}+</p>
					</FlexRow>
					<FlexRow className={styles.disclaimer}>
						<span className={styles.title}>Регистрация гостей</span>
						<div className={styles.grayBox}>
							<p>
								Регистрация гостей и участников строго обязательна. По итогам регистрации Вам будет
								направлен СМС со ссылкой на пропуск. Проезд и проход на мероприятие осуществляется
								исключительно на основании пропуска. Рекомендуем пропуск сохранить на телефон или
								иметь в распечатанном виде. ВХОД БЕСПЛАТНЫЙ!
							</p>
						</div>
					</FlexRow>
					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(onSubmit)} noValidate className={styles.regForm}>
							<InfoSection
								setIsCodeAccepted={setIsCodeAccepted}
								isCodeAccepted={isCodeAccepted}
								errorForm={errorForm}
								setErrorForm={setErrorForm}
							/>
							<GuestFields />
							<RegionSection
								regions={regions?.regions}
								citys={citys?.citys}
								setLockSearch={setLockSearch}
								lockSearch={lockSearch}
							/>
							<VisitSection
								selectOptionsLager={selectOptions?.lager_types}
								selectOptionsCars={selectOptions?.car_types}
							/>
							<DatesSection selectOptions={selectOptions?.dates} />
							<FlexRow className={cn(styles.disclaimer, styles._last)}>
								<div className={styles.grayBox}>
									<p>
										Внимание! Завершение регистрации означает согласие с{' '}
										<a href={`https://этноспорт.рф/events/1/docs`} target='_blank' rel='noreferrer'>
											Политикой защиты и обработки персональных данных
										</a>{' '}
										и{' '}
										<a
											href={`https://этноспорт.рф/events/1/rules`}
											target='_blank'
											rel='noreferrer'
										>
											Правилами посещения игр
										</a>
										.
									</p>
								</div>
							</FlexRow>
							<MainButton type='submit' disabled={!isCodeAccepted}>
								Завершить регистрацию
							</MainButton>
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	)
}
