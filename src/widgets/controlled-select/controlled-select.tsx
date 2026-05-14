import React, { type FC } from 'react'
import { type SelOption } from 'src/types/select'
import { type FieldError, useController, useFormContext } from 'react-hook-form'
import Select from 'react-dropdown-select'
import { ErrorMessage } from '@hookform/error-message'
import cn from 'classnames'

import styles from './index.module.scss'

type ControlledSelectProps = {
	selectOptions: SelOption[]
	name: string
	label?: string
	className?: string
	margin?: string
	dynamicError?: FieldError | undefined
	disabled?: boolean
	isRequired?: boolean
	bigFont?: boolean
}

export const ControlledSelect: FC<ControlledSelectProps> = ({
	selectOptions,
	name,
	label,
	className,
	margin,
	dynamicError,
	disabled,
	isRequired,
	bigFont = false,
	...props
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()

	const {
		field: { value, onChange, onBlur },
	} = useController({
		name,
		control,
		defaultValue: [],
	})

	return (
		<div
			className={cn(styles.selectWrapper, { [styles.selectHugeWrapper]: bigFont }, className)}
			style={{ margin }}
		>
			{label && (
				<label>
					{label} {isRequired ? <span className={styles.reqStar}>*</span> : null}
				</label>
			)}

			<Select
				{...props}
				options={selectOptions}
				values={Array.isArray(value) ? value : []}
				onChange={(values) => onChange(values)}
				onDropdownClose={onBlur}
				disabled={disabled}
				className={cn({ [styles.disabled]: disabled })}
				searchBy='label'
				searchable
				noDataLabel='Ничего не найдено'
				placeholder=''
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
