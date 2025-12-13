import React, { type FC } from 'react'
import { type SelOption } from 'src/types/select'
import { type FieldError, useController, useFormContext } from 'react-hook-form'

import Select from 'react-dropdown-select'

import styles from './index.module.scss'

import { ErrorMessage } from '@hookform/error-message'
import cn from 'classnames'

type ControlledSelectProps = {
	selectOptions: SelOption[]
	name: string
	label?: string
	className?: string
	margin?: string
	dynamicError?: FieldError | undefined
	disabled?: boolean
}
export const ControlledSelect: FC<ControlledSelectProps> = ({
	selectOptions,
	name,
	label,
	className,
	margin,
	dynamicError,
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
		defaultValue: selectOptions[0].value,
	})
	return (
		<div className={cn(styles.selectWrapper, className)} style={{ margin }}>
			{label && <label>{label}</label>}
			<Select
				{...register(name)}
				{...props}
				options={selectOptions}
				values={[selectOptions[0]]}
				onChange={(values) => onChange(values[0]?.value)}
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
