import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'

import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { ControlledInput } from 'src/widgets/controlled-input/controlled-input'
import { AppRoute } from 'src/app/router/consts'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

import { type RecoverInputs, recoverInputsSchema } from './schema'
import styles from './index.module.scss'
import {
	useRegActivateRecoverMutation,
	useRegRecoverMutation,
} from 'src/features/auth/api/auth.api'

type RecoverStep = 'email' | 'code' | 'password'

const CORRECT_MOCK_CODE = '123456'

export const RecoverPage = () => {
	const navigate = useNavigate()
	const [regRecover] = useRegRecoverMutation()
	const [regActivateRecover] = useRegActivateRecoverMutation()
	const [step, setStep] = useState<RecoverStep>('email')
	const [isLoading, setIsLoading] = useState(false)

	const methods = useForm<RecoverInputs>({
		mode: 'onBlur',
		resolver: yupResolver(recoverInputsSchema),
		defaultValues: {
			email: '',
			code: '',
			password: '',
			repeat_password: '',
		},
	})

	const { trigger, getValues, handleSubmit } = methods

	const sendRecoverCode = async () => {
		const isValid = await trigger('email')

		if (!isValid) {
			return
		}

		const data = getValues()

		try {
			setIsLoading(true)
			const formData = new FormData()
			formData.append('email', data.email)
			await regRecover(formData).unwrap()

			toast.success('Код восстановления отправлен на почту')
			setStep('code')
		} catch {
			toast.error('Не удалось отправить код восстановления')
		} finally {
			setIsLoading(false)
		}
	}

	const checkRecoverCode = async () => {
		const isValid = await trigger('code')

		if (!isValid) {
			return
		}

		const data = getValues()

		try {
			setIsLoading(true)

			const formData = new FormData()
			formData.append('email', data.email)
			formData.append('code', data.code)
			await regActivateRecover(formData).unwrap()

			if (data.code !== CORRECT_MOCK_CODE) {
				toast.error('Неверный код восстановления')
				return
			}

			toast.success('Код подтверждён')
			setStep('password')
		} catch {
			toast.error('Не удалось проверить код')
		} finally {
			setIsLoading(false)
		}
	}

	const onSubmit: SubmitHandler<RecoverInputs> = async (data) => {
		if (step !== 'password') {
			return
		}

		try {
			setIsLoading(true)

			console.log('Запрос на смену пароля:', {
				email: data.email,
				code: data.code,
				password: data.password,
				repeat_password: data.repeat_password,
			})

			toast.success('Пароль успешно изменён')
			navigate(`/auth`)
		} catch {
			toast.error('Не удалось изменить пароль')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Section className={styles.authSection}>
			<Container className={styles.authCont}>
				<h1 className={styles.title}>Восстановление пароля</h1>

				<FormProvider {...methods}>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						{step === 'email' && (
							<FlexRow className={styles.step}>
								<ControlledInput
									className={styles.input}
									name='email'
									type='email'
									placeholder='Введите почту'
								/>

								<MainButton
									className={styles.enterBtn}
									type='button'
									onClick={sendRecoverCode}
									disabled={isLoading}
								>
									Получить код
								</MainButton>
							</FlexRow>
						)}

						{step === 'code' && (
							<FlexRow className={styles.step}>
								<p className={styles.description}>
									Введите код восстановления. Код отправлен на вашу почту.
								</p>

								<ControlledInput
									className={styles.input}
									name='code'
									type='text'
									placeholder='Введите код'
								/>

								<MainButton
									className={styles.enterBtn}
									type='button'
									onClick={checkRecoverCode}
									disabled={isLoading}
								>
									Подтвердить код
								</MainButton>

								<button
									type='button'
									className={styles.backButton}
									onClick={() => setStep('email')}
								>
									Изменить почту
								</button>
							</FlexRow>
						)}

						{step === 'password' && (
							<FlexRow className={styles.step}>
								<ControlledInput
									className={styles.input}
									name='password'
									type='password'
									placeholder='Введите новый пароль'
								/>

								<ControlledInput
									className={styles.input}
									name='repeat_password'
									type='password'
									placeholder='Повторите новый пароль'
								/>

								<MainButton className={styles.enterBtn} type='submit' disabled={isLoading}>
									Сменить пароль
								</MainButton>
							</FlexRow>
						)}

						<Link className={styles.authLink} to={`/${AppRoute.AUTH}`}>
							Вернуться к авторизации
						</Link>
					</form>
				</FormProvider>
			</Container>
		</Section>
	)
}
