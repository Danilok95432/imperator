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

export const InfoPage = () => {
	useAdditionalCrumbs('Личные данные')
	const methods = useForm<LkInputs>({
		mode: 'onBlur',
		resolver: yupResolver(lkInputsSchema),
	})
	const onSubmit: SubmitHandler<LkInputs> = async (data) => {
		console.log(data)
	}
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
						<ControlledInput name='name' label='Имя*' margin='0 0 32px 0' />
						<ControlledInput name='secondName' label='Фамилия*' margin='0 0 32px 0' />
						<ControlledInput name='email' label='Email*' margin='0 0 32px 0' />
						<ControlledInput name='phone' label='Телефон*' margin='0 0 32px 0' isPhone />
						<FlexRow className={styles.inputRow}>
							<ControlledInput
								name='password'
								label='Новый пароль'
								type='password'
								className={styles.input}
								margin='0 0 32px 0'
							/>
						</FlexRow>
						<FlexRow className={styles.inputRow}>
							<ControlledInput
								name='repeatPassword'
								label='Подтверждение нового пароля*'
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
