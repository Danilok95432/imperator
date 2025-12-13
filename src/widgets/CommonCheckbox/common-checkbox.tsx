import { type FC } from 'react'
import styles from './index.module.scss'
import { CheckMarkSvg } from 'src/shared/ui/icons/checkMarkSVG'

interface CheckboxProps {
	checked: boolean
	onChange: (checked: boolean) => void
	label?: string
	disabled?: boolean
	className?: string
}

export const CommonCheckbox: FC<CheckboxProps> = ({
	checked,
	onChange,
	label = '',
	disabled = false,
	className = '',
}) => {
	const handleChange = () => {
		if (!disabled) {
			onChange(!checked)
		}
	}

	return (
		<div className={`${styles.checkboxContainer} ${className}`}>
			<label className={`${styles.label} ${disabled ? styles.disabled : ''}`}>
				<input
					type='checkbox'
					checked={checked}
					onChange={handleChange}
					disabled={disabled}
					className={styles.input}
				/>
				<span className={styles.customCheckbox}>{checked && <CheckMarkSvg />}</span>
				{label && <span className={styles.labelText}>{label}</span>}
			</label>
		</div>
	)
}
