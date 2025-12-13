import { type FC, type ReactNode, useRef, useState } from 'react'
import cn from 'classnames'

import styles from './index.module.scss'
import { AccordionArrow } from 'src/shared/ui/icons/accordionArrow'

type AccordionItemProps = {
	trigger: ReactNode
	content: ReactNode
	className?: string
	customArrow?: ReactNode
}

export const AccordionItem: FC<AccordionItemProps> = ({
	trigger,
	content,
	className,
	customArrow,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const contentRef = useRef<HTMLDivElement>(null)

	const toggleAccordion = () => {
		setIsOpen(!isOpen)
	}
	return (
		<div className={cn(styles.accordion, className)}>
			<button
				className={cn(styles.accordionTrigger, { _triggerOpen: isOpen })}
				onClick={toggleAccordion}
				type='button'
			>
				{trigger}
				{customArrow ?? <AccordionArrow />}
			</button>
			<div
				className={styles.accordionContent}
				style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0' }}
				ref={contentRef}
			>
				<div className={cn(styles.accordionContentInner, 'accordion-content')}>{content}</div>
			</div>
		</div>
	)
}
