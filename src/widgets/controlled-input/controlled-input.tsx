import React, { type FC, type ReactNode, useState } from 'react'
import { type FieldError, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import cn from 'classnames'
import InputMask from 'react-input-mask'

import styles from './index.module.scss'
import { PasswordEyeSvg } from 'src/shared/ui/icons/passwordEyeSVG'

type ControlledInputProps = {
	mask?: string
	maskPlaceholder?: string
	className?: string
	label?: string | ReactNode
	isTextarea?: boolean
	dynamicError?: FieldError | undefined
	name: string
	margin?: string
	width?: string
	height?: string
	type?: string
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>

export const ControlledInput: FC<ControlledInputProps> = ({
	name,
	className,
	mask,
	maskPlaceholder,
	label,
	dynamicError,
	isTextarea,
	margin,
	width,
	height,
	type,
	...props
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	const [isVisiblePass, setIsVisiblePass] = useState<boolean>(false)

	if (isTextarea) {
		return (
			<div className={cn(styles.inputEl, styles.textareaEl, className)} style={{ margin, width }}>
				<label className={cn(styles.inputWrapper, styles.textareaWrapper)}>
					{label && <p>{label}</p>}
					<textarea
						{...register(name)}
						{...props}
						className={cn(styles.controlledInput, {
							[styles.noValid]: errors[name],
						})}
						style={{ height }}
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

	if (type === 'password')
		return (
			<div className={cn(styles.inputEl, className)} style={{ margin, width }}>
				<label className={styles.inputWrapper}>
					{label && <p>{label}</p>}
					<div className={styles.passwordInputWrapper}>
						<input
							{...register(name)}
							{...props}
							type={isVisiblePass ? 'text' : 'password'}
							className={cn(styles.controlledInput, {
								[styles.noValid]: errors[name],
							})}
						/>
						<button
							className={cn(styles.passEyeBtn, { [styles._crossOut]: isVisiblePass })}
							onClick={() => setIsVisiblePass(!isVisiblePass)}
							type='button'
						>
							{<PasswordEyeSvg />}
						</button>
					</div>
				</label>

				{dynamicError && <p className={styles.warningMessage}>{dynamicError.message}</p>}
				{errors[name] && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name={name} />
					</p>
				)}
			</div>
		)

	return (
		<div className={cn(styles.inputEl, className)} style={{ margin, width }}>
			<label className={styles.inputWrapper}>
				{label && <p>{label}</p>}
				<InputMask
					{...register(name)}
					{...props}
					type={type}
					mask={mask ?? ''}
					maskPlaceholder={maskPlaceholder ?? '_'}
					className={cn(styles.controlledInput, {
						[styles.noValid]: errors[name],
					})}
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
