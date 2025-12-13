import React, { type FC } from 'react'
import { useFormContext, useController, type FieldError } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { IMaskInput } from 'react-imask'
import cn from 'classnames'
import IMask from 'imask'

import styles from './index.module.scss'

type MaskedDateInputProps = {
	className?: string
	label?: string
	name: string
	placeholder?: string
	margin?: string
	dynamicError?: FieldError | undefined
}

export const MaskedDateInput: FC<MaskedDateInputProps> = ({
	name,
	className,
	label,
	placeholder,
	margin,
	dynamicError,
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()

	const {
		field: { ref, value, onChange, ...inputProps },
	} = useController({
		name,
		control,
	})

	const currentYear = new Date().getFullYear()

	return (
		<div className={cn(styles.dateInputWrapper, className)} style={{ margin }}>
			<label>
				{label && <p>{label}</p>}
				<IMaskInput
					mask='d.m.Y'
					blocks={{
						d: {
							mask: IMask.MaskedRange,
							from: 1,
							to: 31,
							maxLength: 2,
						},
						m: {
							mask: IMask.MaskedRange,
							from: 1,
							to: 12,
							maxLength: 2,
						},
						Y: {
							mask: IMask.MaskedRange,
							from: 1900,
							to: currentYear,
						},
					}}
					value={value || ''}
					unmask={false}
					placeholder={placeholder ?? 'дд.мм.гггг'}
					className={styles.dateInput}
					{...inputProps}
					inputRef={ref}
					onAccept={(val) => {
						onChange(val)
					}}
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
