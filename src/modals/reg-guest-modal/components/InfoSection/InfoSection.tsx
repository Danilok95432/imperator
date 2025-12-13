import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import styles from '../../index.module.scss'
import { type FC, useEffect, useRef } from 'react'
import { FormInput } from 'src/widgets/FormInput/form-input'

type InfoSectionProps = {
	errorForm?: string
	setErrorForm?: (value: string) => void
	isCodeAccepted?: boolean
	setIsCodeAccepted: (arg0: boolean) => void
}

export const InfoSection: FC<InfoSectionProps> = ({
	isCodeAccepted,
	setIsCodeAccepted,
	errorForm,
	setErrorForm,
}) => {
	const phoneInputRef = useRef<HTMLInputElement>(null)
	const codeInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (errorForm) {
			const targetRef = isCodeAccepted ? phoneInputRef : codeInputRef

			if (targetRef.current) {
				targetRef.current.focus()
				targetRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				})
			}
		}
	}, [errorForm, isCodeAccepted])

	return (
		<div className={styles.formSection}>
			<span className={styles.title}>Основные данные</span>
			<FlexRow className={styles.groupInputsStart}>
				<div className={styles.inputwithLabel} ref={phoneInputRef}>
					<FormInput
						name='phone'
						label='Номер телефона'
						isPhoneWithCode={true}
						className={styles.noMargin}
						isCodeAccepted={isCodeAccepted}
					/>
					{errorForm && <p className={styles.warningMessage}>{errorForm}</p>}
					<span className={styles.phoneSpan}>На этот номер поступит СМС со ссылкой на билет</span>
				</div>
				<div className={styles.inputwithLabel} ref={codeInputRef}>
					<FormInput
						name='code'
						label='Проверочный код'
						isCode
						isCodeAccepted={isCodeAccepted}
						errorForm={errorForm}
						setErrorForm={setErrorForm}
						setIsCodeAccepted={setIsCodeAccepted}
						className={styles.noMargin}
					/>
					{!isCodeAccepted && errorForm && <p className={styles.warningMessage}>Неверный код</p>}
					<span>Введите поступивший код для проверки номера телефона</span>
				</div>
			</FlexRow>
			<FlexRow className={styles.groupInputs}>
				<FormInput name='surname' label='Фамилия' />
				<FormInput name='firstname' label='Имя' />
			</FlexRow>
			<FlexRow className={styles.groupInputs}>
				<FormInput name='fathname' label='Отчество' className={styles.inputWrapperContainer} />
				<FormInput name='age' label='Возраст' className={styles.shortInput} />
			</FlexRow>
			<FormInput name='email' label='Электронная почта' />
		</div>
	)
}
