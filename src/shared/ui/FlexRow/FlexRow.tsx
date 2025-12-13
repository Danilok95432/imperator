import { type FC, type ReactNode } from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'

type FlexRowProps = {
	className?: string
	children: ReactNode
}

export const FlexRow: FC<FlexRowProps> = ({ className, children }) => {
	const combinedClassName = classNames(styles.flexRowContainer, className)

	return <div className={combinedClassName}>{children}</div>
}
