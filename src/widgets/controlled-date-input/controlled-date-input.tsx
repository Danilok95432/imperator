import React, { type FC } from 'react'

import { useFormContext, useController, type FieldError } from 'react-hook-form'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ErrorMessage } from '@hookform/error-message'
import ru from 'date-fns/locale/ru'
import cn from 'classnames'

import styles from './index.module.scss'

registerLocale('ru', ru)

type ControlledDateInputProps = {
	className?: string
	label?: string
	name: string
	dateFormat?: string
	showTimeSelect?: boolean
	showTimeSelectOnly?: boolean
	timeFormat?: string
	placeholder?: string
	margin?: string
	dynamicError?: FieldError | undefined
}
export const ControlledDateInput: FC<ControlledDateInputProps> = ({
	name,
	className,
	label,
	dateFormat,
	showTimeSelect,
	showTimeSelectOnly,
	timeFormat,
	placeholder,
	margin,
	dynamicError,
	...props
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()
	const {
		field: { ref, ...inputProps },
	} = useController({
		name,
		control,
	})

	return (
		<div className={cn(styles.dateInputWrapper, className)} style={{ margin }}>
			<label>
				{label && <p>{label}</p>}
				<DatePicker
					{...inputProps}
					{...props}
					locale='ru'
					selected={inputProps.value}
					onChange={(date) => inputProps.onChange(date)}
					dateFormat={dateFormat ?? 'dd-MM-yyyy'}
					timeFormat={timeFormat ?? 'HH:mm'}
					timeIntervals={15}
					timeCaption='Время'
					placeholderText={placeholder}
					showTimeSelect={showTimeSelect ?? false}
					showTimeSelectOnly={showTimeSelectOnly}
				/>
			</label>

			{dynamicError && <p className={styles.warningMessage}>{dynamicError.message}</p>}
			{errors[name] && (
				<p className={styles.warningMessage}>
					<ErrorMessage errors={errors} name={name} />
				</p>
			)}
		</div>
	)
}
