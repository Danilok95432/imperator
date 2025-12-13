import { FormProvider, type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import styles from './index.module.scss'
import { useEffect, useRef, useState } from 'react'
import { type RegNewInputs, regNewSchema } from './schema'
import { InfoSection } from './components/InfoSection/InfoSection'
import { RegionSection } from './components/RegionSection/RegionSection'
import { toast } from 'react-toastify'
import { useActions } from 'src/app/store/hooks/actions'
import {
	useGetCityByRegionQuery,
	useGetRegionsByValueQuery,
	useSendRegistrationFormMutation,
} from 'src/features/auth/api/auth.api'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { formatDateToYYYYMMDD, transformToFormData } from 'src/shared/helpers/utils'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { LogoModalMobileSVG } from 'src/shared/ui/icons/logoModalMobileSVG'
import { LogoModalSVG } from 'src/shared/ui/icons/logoModalSVG'

export const RegModal = () => {
	const { closeModal } = useActions()
	const modalRef = useRef<HTMLDivElement>(null)
	const { data: regions } = useGetRegionsByValueQuery(' ')
	const [isCodeAccepted, setIsCodeAccepted] = useState(false)
	const [saveRegForm] = useSendRegistrationFormMutation()
	const [errorForm, setErrorForm] = useState<string>('')
	const breakPoint = useBreakPoint()

	const methods = useForm<RegNewInputs>({
		mode: 'onBlur',
		resolver: yupResolver(regNewSchema),
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

	const onSubmit: SubmitHandler<RegNewInputs> = async (data) => {
		const region = regions?.regions.filter((reg) => reg.label === data.id_region)[0].value
		const city = citys?.citys.filter((nas) => nas.label === data.id_city)[0].value
		const serverData = {
			id_reg_type: '2',
			surname: data.surname,
			firstname: data.firstname,
			fathname: data.fathname,
			birthdate: formatDateToYYYYMMDD(data.birthdate),
			id_region: region,
			id_city: city,
			email: data.email,
			phone: data.phone,
		}
		try {
			if (isCodeAccepted) {
				const regForm = transformToFormData(serverData)
				if (serverData.id_city === '' || serverData.id_city === undefined) {
					regForm.append('city_name', data.id_city)
				}
				const res = (await saveRegForm(regForm)) as unknown as {
					data: { status: string; errortext: string }
				}
				if (res.data.status === 'ok') {
					closeModal()
					toast.success('Регистрация прошла успешно!', {
						position: 'bottom-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
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
		closeModal()
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
					<h2>Регистрация участника</h2>
					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(onSubmit)} noValidate className={styles.regForm}>
							<InfoSection
								setIsCodeAccepted={setIsCodeAccepted}
								isCodeAccepted={isCodeAccepted}
								errorForm={errorForm}
								setErrorForm={setErrorForm}
							/>
							<RegionSection
								regions={regions?.regions}
								citys={citys?.citys}
								setLockSearch={setLockSearch}
								lockSearch={lockSearch}
							/>
							<FlexRow className={cn(styles.disclaimer, styles._last)}>
								<div className={styles.grayBox}>
									<p>
										Внимание! Завершение регистрации означает согласие с{' '}
										<a href={`https://этноспорт.рф/events/1/docs`}>
											Политикой защиты и обработки персональных данных
										</a>{' '}
										и <a href={`https://этноспорт.рф/events/1/rules`}>Правилами посещения игр</a>.
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
