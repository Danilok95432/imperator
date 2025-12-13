import { useState, useEffect } from 'react'
import styles from './index.module.scss'
import { SlideNextSvg } from 'src/shared/ui/icons/slideNextSVG'

export const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [isClicked, setIsClicked] = useState(false)
	const headerHeight = 80

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > headerHeight) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		window.addEventListener('scroll', toggleVisibility)

		return () => window.removeEventListener('scroll', toggleVisibility)
	}, [headerHeight])

	const scrollToTop = () => {
		setIsClicked(true)
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
		setTimeout(() => setIsClicked(false), 300)
	}

	return (
		<button
			className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''}`}
			onClick={scrollToTop}
			aria-label='Наверх'
		>
			<SlideNextSvg color='white' className={`${styles.arrow} ${isClicked ? styles.bounce : ''}`} />
		</button>
	)
}
