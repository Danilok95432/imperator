import { Link } from 'react-router-dom'
import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'

import styles from './index.module.scss'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additionalCrumbs'
import { AppRoute } from 'src/app/router/consts'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, type SubmitHandler, FormProvider } from 'react-hook-form'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { ControlledCheckbox } from 'src/widgets/controlled-checkbox/controlled-checkbox'
import { ControlledInput } from 'src/widgets/controlled-input/controlled-input'
import { type RegInputs, regInputsSchema } from './schema'

export const RegistrationPage = () => {
	useAdditionalCrumbs('Регистрация')
	const methods = useForm<RegInputs>({
		mode: 'onBlur',
		resolver: yupResolver(regInputsSchema),
	})
	const onSubmit: SubmitHandler<RegInputs> = async (data) => {
		console.log(data)
	}
	return (
		<Section className={styles.regSection}>
			<Container className={styles.regCont}>
				<h1 className={styles.title}>Регистрация</h1>
				<FormProvider {...methods}>
					<form
						className={styles.form}
						onSubmit={methods.handleSubmit(onSubmit)}
						noValidate
						autoComplete='off'
					>
						<ControlledInput name='name' label='Имя*' margin='0 0 32px 0' />
						<ControlledInput name='secondName' label='Фамилия*' margin='0 0 32px 0' />
						<ControlledInput name='email' label='Email*' margin='0 0 32px 0' />
						<ControlledInput name='phone' label='Телефон*' margin='0 0 32px 0' />
						<FlexRow className={styles.inputRow}>
							<ControlledInput
								name='password'
								label='Пароль'
								type='password'
								className={styles.input}
								margin='0 0 32px 0'
							/>
						</FlexRow>
						<FlexRow className={styles.inputRow}>
							<ControlledInput
								name='repeatPassword'
								label='Подтверждение пароля*'
								type='password'
								className={styles.input}
							/>
						</FlexRow>
						<FlexRow className={styles.controlsWrapper}>
							<ControlledCheckbox
								name='want'
								label='Хочу получать новости на почту'
								type='checkbox'
							/>
							<MainButton type='submit' className={styles.enterBtn}>
								Зарегистрироваться
							</MainButton>
							<Link to={`${AppRoute.AUTH}`} className={styles.link}>
								Авторизация
							</Link>
						</FlexRow>
					</form>
				</FormProvider>
			</Container>
		</Section>
	)
}
