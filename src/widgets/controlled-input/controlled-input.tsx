import React, { type FC, type ReactNode, useState } from 'react'
import { Controller, type FieldError, useFormContext } from 'react-hook-form'
import cn from 'classnames'
import { ErrorMessage } from '@hookform/error-message'

import styles from './index.module.scss'
import { LockedInputSVG } from 'src/shared/ui/icons/lockedInputSVG'
import { PasswordEyeSvg } from 'src/shared/ui/icons/passwordEyeSVG'
import InputMask from 'react-input-mask'

type ControlledInputProps = {
	className?: string
	label?: string | ReactNode
	subLabel?: string
	isTextarea?: boolean
	dynamicError?: FieldError | undefined
	name: string
	margin?: string
	width?: string
	maxWidth?: string
	height?: string
	type?: string
	isReadOnly?: boolean
	isLogin?: boolean
	disabled?: boolean
	isRequired?: boolean
	bigFont?: boolean
	locked?: boolean
	isPhone?: boolean
	isCart?: boolean
	isAutoCompleteOff?: boolean
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>

export const ControlledInput: FC<ControlledInputProps> = ({
	name,
	className,
	label,
	dynamicError,
	isTextarea,
	margin,
	width,
	maxWidth,
	height,
	type,
	isReadOnly,
	isLogin = false,
	disabled,
	isRequired,
	bigFont = false,
	locked = false,
	subLabel,
	isPhone = false,
	isCart = false,
	isAutoCompleteOff = false,
	...props
}) => {
	const {
		register,
		formState: { errors },
		control,
	} = useFormContext()

	const [isVisiblePass, setIsVisiblePass] = useState<boolean>(false)

	const getOnlyDigits = (value: string) => value.replace(/\D/g, '')

	if (isTextarea) {
		return (
			<div
				className={cn(
					styles.inputEl,
					styles.textareaEl,
					{ [styles.inputElBig]: bigFont },
					className,
				)}
				style={{ margin, width, maxWidth }}
			>
				<label className={cn(styles.inputWrapper, styles.textareaWrapper)}>
					{label && (
						<p>
							{label} {isRequired ? <span className={styles.reqStar}>*</span> : null}
						</p>
					)}

					{subLabel && <p className={styles.subLabel}>{subLabel}</p>}

					<textarea
						{...register(name)}
						{...props}
						readOnly={isReadOnly}
						disabled={disabled}
						className={cn(styles.controlledInput, {
							[styles.noValid]: errors[name],
							[styles.disabled]: locked,
						})}
						style={{ height }}
					/>
				</label>

				{locked && (
					<div className={styles.locked}>
						<LockedInputSVG />
					</div>
				)}

				{dynamicError && <p className={styles.warningMessage}>{dynamicError.message}</p>}

				{errors[name] && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name={name} />
					</p>
				)}
			</div>
		)
	}

	if (type === 'password') {
		return (
			<div className={cn(styles.inputEl, className)} style={{ margin, width, maxWidth }}>
				<label className={styles.inputWrapper}>
					{label && <p>{label}</p>}

					<div className={styles.passwordInputWrapper}>
						<input
							{...register(name)}
							{...props}
							type={isVisiblePass ? 'text' : 'password'}
							readOnly={isReadOnly}
							disabled={disabled}
							className={cn(styles.controlledInput, {
								[styles.noValid]: errors[name],
							})}
							autoComplete={isAutoCompleteOff ? 'off' : 'on'}
						/>

						<button
							className={cn(styles.passEyeBtn, { [styles._crossOut]: isVisiblePass })}
							onClick={() => setIsVisiblePass(!isVisiblePass)}
							type='button'
						>
							<PasswordEyeSvg />
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
	}

	if (isPhone) {
		return (
			<div
				className={cn(styles.inputEl, { [styles.inputElBig]: bigFont }, className)}
				style={{ margin, width, maxWidth }}
			>
				<label className={styles.inputWrapper}>
					{label && (
						<p>
							{label} {isRequired ? <span className={styles.reqStar}>*</span> : null}
						</p>
					)}

					{subLabel && <p className={styles.subLabel}>{subLabel}</p>}

					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<InputMask
								mask='+7 (999) 999-99-99'
								maskChar={null}
								value={field.value || ''}
								onBlur={field.onBlur}
								onChange={(e) => {
									field.onChange(e.target.value)
									props.onChange?.(e)
								}}
								readOnly={isReadOnly}
								disabled={disabled}
							>
								<input
									type='tel'
									className={cn(styles.controlledInput, {
										[styles.noValid]: errors[name],
										[styles.noBorder]: isLogin,
									})}
								/>
							</InputMask>
						)}
					/>
				</label>

				{locked && (
					<div className={styles.locked}>
						<LockedInputSVG />
					</div>
				)}

				{dynamicError && <p className={styles.warningMessage}>{dynamicError.message}</p>}

				{errors[name] && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name={name} />
					</p>
				)}
			</div>
		)
	}

	if (isCart) {
		return (
			<div
				className={cn(styles.inputEl, { [styles.inputElBig]: bigFont }, className)}
				style={{ margin, width, maxWidth }}
			>
				<label className={styles.inputWrapper}>
					{label && (
						<p>
							{label} {isRequired ? <span className={styles.reqStar}>*</span> : null}
						</p>
					)}

					{subLabel && <p className={styles.subLabel}>{subLabel}</p>}

					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<input
								{...props}
								type='text'
								inputMode='numeric'
								pattern='[0-9]*'
								value={field.value ?? ''}
								readOnly={isReadOnly}
								disabled={disabled}
								className={cn(styles.controlledInput, {
									[styles.noValid]: errors[name],
									[styles.noBorder]: isLogin,
									[styles.disabled]: locked,
								})}
								autoComplete={isAutoCompleteOff ? 'off' : 'on'}
								onChange={(e) => {
									const onlyDigits = getOnlyDigits(e.target.value)

									field.onChange(onlyDigits)

									e.target.value = onlyDigits
									props.onChange?.(e)
								}}
								onBlur={(e) => {
									field.onBlur()
									props.onBlur?.(e)
								}}
								onKeyDown={(e) => {
									const allowedKeys = [
										'Backspace',
										'Delete',
										'Tab',
										'Escape',
										'Enter',
										'ArrowLeft',
										'ArrowRight',
										'ArrowUp',
										'ArrowDown',
										'Home',
										'End',
									]

									const isCtrlCombination = e.ctrlKey || e.metaKey
									const isDigit = /^\d$/.test(e.key)

									if (!isDigit && !allowedKeys.includes(e.key) && !isCtrlCombination) {
										e.preventDefault()
										return
									}

									props.onKeyDown?.(e)
								}}
								onPaste={(e) => {
									e.preventDefault()

									const pastedText = e.clipboardData.getData('text')
									const pastedDigits = getOnlyDigits(pastedText)

									if (!pastedDigits) return

									const input = e.currentTarget
									const currentValue = String(field.value ?? '')
									const selectionStart = input.selectionStart ?? currentValue.length
									const selectionEnd = input.selectionEnd ?? currentValue.length

									const nextValue =
										currentValue.slice(0, selectionStart) +
										pastedDigits +
										currentValue.slice(selectionEnd)

									field.onChange(nextValue)

									requestAnimationFrame(() => {
										const nextCursorPosition = selectionStart + pastedDigits.length
										input.setSelectionRange(nextCursorPosition, nextCursorPosition)
									})

									props.onPaste?.(e)
								}}
							/>
						)}
					/>
				</label>

				{locked && (
					<div className={styles.locked}>
						<LockedInputSVG />
					</div>
				)}

				{dynamicError && <p className={styles.warningMessage}>{dynamicError.message}</p>}

				{errors[name] && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name={name} />
					</p>
				)}
			</div>
		)
	}

	return (
		<div
			className={cn(styles.inputEl, { [styles.inputElBig]: bigFont }, className)}
			style={{ margin, width, maxWidth }}
		>
			<label className={styles.inputWrapper}>
				{label && (
					<p>
						{label} {isRequired ? <span className={styles.reqStar}>*</span> : null}
					</p>
				)}

				{subLabel && <p className={styles.subLabel}>{subLabel}</p>}

				<input
					{...register(name)}
					{...props}
					type={type}
					readOnly={isReadOnly}
					className={cn(styles.controlledInput, {
						[styles.noValid]: errors[name],
						[styles.noBorder]: isLogin,
						[styles.disabled]: locked,
					})}
					disabled={disabled}
					autoComplete={isAutoCompleteOff ? 'off' : 'on'}
				/>
			</label>

			{locked && (
				<div className={styles.locked}>
					<LockedInputSVG />
				</div>
			)}

			{dynamicError && <p className={styles.warningMessage}>{dynamicError.message}</p>}

			{errors[name] && (
				<p className={styles.warningMessage}>
					<ErrorMessage errors={errors} name={name} />
				</p>
			)}
		</div>
	)
}
