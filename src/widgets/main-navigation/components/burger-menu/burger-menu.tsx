import { useEffect, useState } from 'react'
import cn from 'classnames'

import { NavLink } from 'react-router-dom'

import styles from './index.module.scss'
import { setActive } from 'src/shared/helpers/utils'
import { navigationElements } from '../../consts'

export const BurgerMenu = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId)
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	}

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}

		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	return (
		<div className={styles.burgerMenu}>
			<div className={styles.burgerIcon} onClick={toggleMenu}>
				<span></span>
				<span></span>
				<span></span>
			</div>

			<nav className={cn(styles.navMenu, { [styles._openMenu]: isOpen })}>
				<div className={cn(styles.burgerIcon, styles._openIcon)} onClick={toggleMenu}>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<ul>
					{navigationElements.map((menuEl, index) => (
						<li className={styles.menuItem} key={index}>
							<NavLink
								className={({ isActive }) => setActive(isActive, styles.activeLink)}
								to={menuEl.link}
								onClick={() => {
									toggleMenu()
									scrollToSection(menuEl.link)
								}}
							>
								{menuEl.title}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}
