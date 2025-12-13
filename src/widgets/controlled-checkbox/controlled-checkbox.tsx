import React, { type FC, useEffect } from 'react'

import { useController, useFormContext } from 'react-hook-form'
import cn from 'classnames'
import { ErrorMessage } from '@hookform/error-message'

import styles from './index.module.scss'
import { CheckMarkSvg } from 'src/shared/ui/icons/checkMarkSVG'

type RadioOption = {
	label: string
	value: string
}

type ControlledCheckboxProps = {
	name: string
	type: 'checkbox' | 'radio'
	options?: RadioOption[]
	required?: boolean
	label?: string
	className?: string
	margin?: string
	disabled?: boolean
	checked?: boolean
	value?: string
}

export const ControlledCheckbox: FC<ControlledCheckboxProps> = ({
	name,
	type,
	label,
	className,
	required,
	options,
	margin,
	disabled,
}) => {
	const {
		register,
		setValue,
		watch,
		control,
		formState: { errors },
	} = useFormContext()

	const { field } = useController({ name, control })

	const handleCheckboxChange = () => {
		setValue(name, !watch(name))
	}

	useEffect(() => {
		if (disabled) {
			setValue(name, false)
		}
	}, [disabled])

	if (type === 'radio') {
		return (
			<div className={cn(styles.radioInputs, className)}>
				{options?.map((option) => (
					<label key={option.value}>
						<input
							type='radio'
							{...field}
							value={option.value}
							checked={field.value === option.value}
							onChange={() => field.onChange(option.value)}
						/>
						{option.label}
					</label>
				))}
			</div>
		)
	}

	return (
		<div className={cn(styles.checkboxEl, className)} style={{ margin }}>
			<div
				className={cn(styles.inputWrapper, { [styles._disabled]: disabled })}
				onClick={handleCheckboxChange}
			>
				<label className={cn({ [styles._active]: watch(name) })}>
					{watch(name) && <CheckMarkSvg />}
				</label>
				<input
					type='checkbox'
					{...register(name)}
					className={styles.checkboxInput}
					required={required}
				/>
				{label && <p>{label}</p>}
			</div>

			{errors[name] && (
				<p className={styles.warningMessage}>
					<ErrorMessage errors={errors} name={name} />
				</p>
			)}
		</div>
	)
}
