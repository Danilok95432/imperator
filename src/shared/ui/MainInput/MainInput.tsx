import React, { type FC } from 'react'
import cn from 'classnames'

import styles from './index.module.scss'

export const MainInput: FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
	return <input {...props} className={cn(styles.mainInput, props.className)} />
}
