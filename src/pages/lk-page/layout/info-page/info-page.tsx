import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, type SubmitHandler, FormProvider } from 'react-hook-form'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additionalCrumbs'
import { type LkInputs, lkInputsSchema } from './schema'
import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { Section } from 'src/shared/ui/Section/section'
import { ControlledCheckbox } from 'src/widgets/controlled-checkbox/controlled-checkbox'
import { ControlledInput } from 'src/widgets/controlled-input/controlled-input'

import styles from './index.module.scss'
import {
	useGetPersonalInfoQuery,
	useSavePersonalInfoMutation,
} from 'src/features/auth/api/auth.api'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { booleanToNumberString } from 'src/shared/helpers/utils'
import { ControlledSelect } from 'src/widgets/controlled-select/controlled-select'

export const InfoPage = () => {
	const { data } = useGetPersonalInfoQuery(null)
	const [savePersonalInfo] = useSavePersonalInfoMutation()
	useAdditionalCrumbs('Личные данные')
	const methods = useForm<LkInputs>({
		mode: 'onBlur',
		resolver: yupResolver(lkInputsSchema),
	})
	const onSubmit: SubmitHandler<LkInputs> = async (data) => {
		console.log(data)
		const formData = new FormData()
		formData.append('firstname', data.firstname)
		formData.append('surname', data.surname)
		formData.append('email', data.email)
		formData.append('telphone', data.telphone)
		formData.append('password', data.password ?? '')
		formData.append('password2', data.password2 ?? '')
		formData.append('use_spam', booleanToNumberString(data.use_spam))
		formData.append('use_org', booleanToNumberString(data.use_org))
		if (data.use_org) {
			formData.append('org_name', data.org_name ?? '')
			formData.append('city', data.city ?? '')
			formData.append('org_street', data.org_street ?? '')
			formData.append('org_house', data.org_house ?? '')
			formData.append('org_apartment', data.org_apartment ?? '')
		}
		const res = await savePersonalInfo(formData)
		if (res && 'data' in res) {
			toast.success('Данные успешно сохранены')
		} else {
			toast.error('Ошибка при сохранении данных')
		}
	}

	const orgChecked = methods.watch('use_org')

	useEffect(() => {
		if (data) {
			methods.reset({ ...data })
		}
	}, [data])

	return (
		<Section className={styles.regSection}>
			<Container className={styles.regCont}>
				<h1 className={styles.title}>Личные данные</h1>
				<FormProvider {...methods}>
					<form
						className={styles.form}
						onSubmit={methods.handleSubmit(onSubmit)}
						noValidate
						autoComplete='off'
					>
						<ControlledInput name='firstname' label='Имя*' margin='0 0 32px 0' />
						<ControlledInput name='fathname' label='Отчество' margin='0 0 32px 0' />
						<ControlledInput name='surname' label='Фамилия*' margin='0 0 32px 0' />
						<ControlledInput name='email' label='Email*' margin='0 0 32px 0' />
						<ControlledInput name='telphone' label='Телефон*' margin='0 0 32px 0' isPhone />
						<ControlledCheckbox
							name='use_org'
							label='Я представляю организацию'
							type='checkbox'
							$margin='0 0 32px 0'
						/>
						{orgChecked && (
							<FlexRow className={styles.orgBlock}>
								<ControlledInput
									name='org_name'
									label='Название организации*'
									margin='0 0 32px 0'
									className={styles.input}
								/>
								<ControlledSelect
									name='city'
									label='Город*'
									selectOptions={[]}
									margin='0 0 32px 0'
									className={styles.input}
								/>
								<ControlledInput
									name='org_street'
									label='Улица*'
									margin='0 0 32px 0'
									className={styles.input}
								/>
								<FlexRow className={styles.orgRow}>
									<ControlledInput
										name='org_house'
										label='Дом*'
										margin='0 0 32px 0'
										className={styles.input}
									/>
									<ControlledInput
										name='org_apartment'
										label='Квартира/офис'
										margin='0 0 32px 0'
										className={styles.input}
									/>
								</FlexRow>
							</FlexRow>
						)}
						<FlexRow className={styles.inputRow}>
							<ControlledInput
								name='password'
								label='Новый пароль'
								type='password'
								className={styles.input}
								margin='0 0 32px 0'
								isAutoCompleteOff={true}
							/>
						</FlexRow>
						<FlexRow className={styles.inputRow}>
							<ControlledInput
								name='password2'
								label='Подтверждение нового пароля*'
								type='password'
								className={styles.input}
								isAutoCompleteOff={true}
							/>
						</FlexRow>
						<FlexRow className={styles.controlsWrapper}>
							<ControlledCheckbox
								name='use_spam'
								label='Хочу получать новости на почту'
								type='checkbox'
							/>
							<FlexRow className={styles.controls}>
								<MainButton className={styles.cancelBtn}>Отмена</MainButton>
								<MainButton type='submit' className={styles.enterBtn}>
									Сохранить изменения
								</MainButton>
							</FlexRow>
						</FlexRow>
					</form>
				</FormProvider>
			</Container>
		</Section>
	)
}
