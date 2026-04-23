import { Link, useNavigate } from 'react-router-dom'
import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'

import styles from './index.module.scss'
import { AppRoute } from 'src/app/router/consts'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { type AuthInputs, authInputsSchema } from './schema'
import { ControlledInput } from 'src/widgets/controlled-input/controlled-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { ControlledCheckbox } from 'src/widgets/controlled-checkbox/controlled-checkbox'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { useActions } from 'src/app/store/hooks/actions'
import { useLoginUserMutation } from 'src/features/auth/api/auth.api'
import { toast } from 'react-toastify'
import { type LoginResponse, getErrorMessage } from '../registration-page/registration-page'

export const AuthPage = () => {
	const { setAuth, setUser } = useActions()
	const [loginUser] = useLoginUserMutation()
	const breakPoint = useBreakPoint()
	const navigate = useNavigate()
	const methods = useForm<AuthInputs>({
		mode: 'onBlur',
		resolver: yupResolver(authInputsSchema),
	})
	const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
		console.log(data)
		try {
			const loginFormData = new FormData()
			loginFormData.append('user_name', data.user_name)
			loginFormData.append('password', data.password)

			const loginResponse = (await loginUser(loginFormData).unwrap()) as LoginResponse

			if (!loginResponse.token || !loginResponse.user) {
				toast.error(loginResponse.errortext ?? 'Ошибка авторизации')
				return
			}

			localStorage.setItem('token', String(loginResponse.token))
			setAuth(true)
			setUser(loginResponse.user)

			toast.success('Авторизация прошла успешно')
			navigate('/lk')
		} catch (error) {
			toast.error(getErrorMessage(error, 'Ошибка регистрации или авторизации'))
		}
	}
	return (
		<Section className={styles.authSection}>
			<Container className={styles.authCont}>
				<h1 className={styles.title}>Авторизация</h1>
				<FormProvider {...methods}>
					<form
						className={styles.form}
						onSubmit={methods.handleSubmit(onSubmit)}
						noValidate
						autoComplete='off'
					>
						<ControlledInput name='user_name' label='Электронная почта' margin='0 0 32px 0' />
						<FlexRow className={styles.inputRow}>
							<ControlledInput
								name='password'
								label='Пароль'
								type='password'
								className={styles.input}
							/>
							<a href='#'>Забыли пароль?</a>
						</FlexRow>
						{breakPoint === 'S' && (
							<MainButton type='submit' className={styles.enterBtnMobile}>
								Войти
							</MainButton>
						)}
						<FlexRow className={styles.controlsWrapper}>
							<ControlledCheckbox name='remember' label='Запомнить меня' type='checkbox' />
							<FlexRow className={styles.controls}>
								<Link to={`${AppRoute.AUTH}/${AppRoute.REGISTRATION}`} className={styles.link}>
									Регистрация
								</Link>
								<MainButton type='submit' className={styles.enterBtn}>
									Войти
								</MainButton>
							</FlexRow>
						</FlexRow>
					</form>
				</FormProvider>
			</Container>
		</Section>
	)
}
