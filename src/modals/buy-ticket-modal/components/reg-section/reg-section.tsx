import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import styles from '../../index.module.scss'
import { type FC, useEffect, useRef } from 'react'
import { FormInput } from 'src/widgets/FormInput/form-input'
import { MaskedDateInput } from 'src/widgets/masked-date-input/masked-date-input'
import classNames from 'classnames'
import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { type SelOption } from 'src/types/select'

type RegSectionProps = {
	errorForm?: string
	setErrorForm?: (value: string) => void
	isCodeAccepted?: boolean
	setIsCodeAccepted?: (arg0: boolean) => void
	regions?: SelOption[]
	citys?: SelOption[]
	lockSearch?: boolean
	setLockSearch?: (arg0: boolean) => void
}

export const RegSection: FC<RegSectionProps> = ({
	isCodeAccepted,
	setIsCodeAccepted,
	errorForm,
	setErrorForm,
	regions = [{ label: '', value: '' }],
	citys = [{ label: '', value: '' }],
	lockSearch,
	setLockSearch,
}) => {
	const phoneInputRef = useRef<HTMLInputElement>(null)
	const codeInputRef = useRef<HTMLInputElement>(null)

	const {
		formState: { errors },
	} = useFormContext()
	// const region = useWatch({ control, name: 'id_region' })

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
		<div className={classNames(styles.formSection, styles.formSectionReg)}>
			<FlexRow className={styles.regHead}>
				<span className={styles.titleSmall}>Регистрация гостя</span>
				<FlexRow className={classNames(styles.disclaimer)}>
					<div className={styles.grayBox}>
						<p>Регистрация гостя обязательна, без нее мы не сможем продать Вам билеты.</p>
					</div>
				</FlexRow>
			</FlexRow>
			<FlexRow className={styles.groupInputs}>
				<FormInput
					name='surname'
					label='Фамилия *'
					className={classNames(styles.first, styles.noMargin)}
				/>
				<MaskedDateInput
					name='birthdate'
					placeholder='дд.мм.гггг'
					className={styles.adminDateInput}
					label='Дата рождения  *'
				/>
			</FlexRow>
			<FlexRow className={styles.groupInputs}>
				<FormInput name='firstname' label='Имя  *' className={styles.noMargin} />
				<FormInput
					name='fathname'
					label='Отчество *'
					className={classNames(styles.inputWrapperContainer, styles.noMargin)}
				/>
			</FlexRow>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='id_region'
					label='Регион РФ'
					className={styles.noMargin}
					is_select
					selectOptions={regions ?? [{ label: 'Не выбрано', value: '0' }]}
				/>
				{errors.id_region && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name={'id_region'} />
					</p>
				)}
				<span>
					Начните ввод названия региона и выберите из предложенных вариантов. Если Вы не из России,
					наберите «ино» и выберите вариант «Иностранец».
				</span>
			</div>
			<FlexRow className={styles.groupInputsStart}>
				<div className={styles.inputwithLabel} ref={phoneInputRef}>
					<FormInput
						name='email'
						label='Адрес e-mail *'
						isEmailCode={true}
						className={classNames(styles.noMargin, styles.first)}
						isCodeAccepted={isCodeAccepted}
					/>
					{errorForm && <p className={styles.warningMessage}>{errorForm}</p>}
					<span className={styles.phoneSpan}>
						На этот адрес поступят письма с проверочным кодом и ссылкой на билет
					</span>
				</div>
				<div className={styles.inputwithLabel} ref={codeInputRef}>
					<FormInput
						name='code'
						label='Проверочный код *'
						isCode
						isCodeAccepted={isCodeAccepted}
						errorForm={errorForm}
						setErrorForm={setErrorForm}
						setIsCodeAccepted={setIsCodeAccepted}
						className={styles.noMargin}
					/>
					{!isCodeAccepted && errorForm && <p className={styles.warningMessage}>Неверный код</p>}
					<span>Введите код для проверки</span>
				</div>
			</FlexRow>
			<FlexRow className={styles.groupInputsStart}>
				<div className={styles.inputwithLabel} ref={phoneInputRef}>
					<FormInput
						name='phone'
						label='Номер телефона *'
						isPhoneWithCode={true}
						className={classNames(styles.noMargin, styles.first)}
						isCodeAccepted={isCodeAccepted}
					/>
					{errorForm && <p className={styles.warningMessage}>{errorForm}</p>}
					<span className={styles.phoneSpan}>На этот номер поступит СМС со ссылкой на билет</span>
				</div>
				<div className={styles.inputwithLabel} ref={codeInputRef}>
					<FormInput
						name='code'
						label='Проверочный код *'
						isCode
						isCodeAccepted={isCodeAccepted}
						errorForm={errorForm}
						setErrorForm={setErrorForm}
						setIsCodeAccepted={setIsCodeAccepted}
						className={styles.noMargin}
					/>
					{!isCodeAccepted && errorForm && <p className={styles.warningMessage}>Неверный код</p>}
					<span>Введите код для проверки</span>
				</div>
			</FlexRow>
			<div className={styles.inputwithLabel} ref={phoneInputRef}>
				<FormInput
					name='email'
					label='Адрес e-mail *'
					className={classNames(styles.noMargin, styles.first)}
				/>
				{errorForm && <p className={styles.warningMessage}>{errorForm}</p>}
				<span className={styles.phoneSpan}>
					На этот адрес поступят письма с проверочным кодом и ссылкой на билет
				</span>
			</div>
			<div className={styles.inputwithLabel} ref={phoneInputRef}>
				<FormInput
					name='phone'
					label='Номер телефона *'
					isPhone
					className={classNames(styles.noMargin, styles.first)}
					isCodeAccepted={isCodeAccepted}
				/>
				{errorForm && <p className={styles.warningMessage}>{errorForm}</p>}
				<span className={styles.phoneSpan}>
					Этот номер будет использован только для контакта
					<br /> с Вами
				</span>
			</div>
			<p className={styles.desc}>
				Электронный кассовый чек будет выслан Вам вместе с билетом на e-mail или телефон.
			</p>
		</div>
	)
}
