import { type SelOption } from 'src/types/select'

import React, { type SelectHTMLAttributes } from 'react'

import styles from './index.module.scss'
import cn from 'classnames'

type MainSelectProps = {
	items: SelOption[]
	wrapperClassName?: string
} & SelectHTMLAttributes<HTMLSelectElement>

export const MainSelect = React.forwardRef<HTMLSelectElement, MainSelectProps>(
	({ wrapperClassName, items, ...props }, ref) => {
		return (
			<div className={cn(styles.selectWrapper, wrapperClassName)}>
				<select {...props} ref={ref}>
					{items.map((el) => (
						<option key={el.value} value={el.value}>
							{el.label}
						</option>
					))}
				</select>
			</div>
		)
	},
)

MainSelect.displayName = 'MainSelect'
