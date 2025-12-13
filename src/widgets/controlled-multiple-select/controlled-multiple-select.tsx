import React, { type FC } from 'react'
import { type MultiSelOption } from 'src/types/select'
import { type FieldError, useController, useFormContext } from 'react-hook-form'

import Select from 'react-dropdown-select'

import styles from './index.module.scss'

import { ErrorMessage } from '@hookform/error-message'
import cn from 'classnames'

type ControlledSelectProps = {
	name: string
	selectOptions: MultiSelOption[]
	label?: string
	className?: string
	margin?: string
	placeholder?: string
	dynamicError?: FieldError | undefined
	disabled?: boolean
}
export const ControlledMultipleSelect: FC<ControlledSelectProps> = ({
	selectOptions,
	name,
	label,
	className,
	margin,
	dynamicError,
	placeholder,
	disabled,
	...props
}) => {
	const {
		register,
		control,
		formState: { errors },
	} = useFormContext()

	const {
		field: { onChange },
	} = useController({
		name,
		control,
		defaultValue: [],
	})
	const selectedOptions = selectOptions.filter((opt) => opt.selected)
	return (
		<div className={cn(styles.selectWrapper, className)} style={{ margin }}>
			{label && <label>{label}</label>}
			<Select
				{...register(name)}
				{...props}
				options={selectOptions}
				values={selectedOptions}
				onChange={(values) => onChange(values.map((v) => v.value).join(','))}
				placeholder={placeholder}
				multi
				disabled={disabled}
			/>
			{dynamicError && <p className={styles.warningMessage}>{dynamicError.message}</p>}
			{errors[name] && (
				<p className={styles.warningMessage}>
					<ErrorMessage errors={errors} name={name} />
				</p>
			)}
		</div>
	)
}
