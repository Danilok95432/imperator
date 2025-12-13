import { Container } from 'src/shared/ui/Container/Container'
import { navigationElements } from './consts'
import styles from './index.module.scss'
import { BurgerMenu } from './components/burger-menu/burger-menu'
// import { AuthModal } from 'src/modals/auth-modal/auth-modal'
import { useActions } from 'src/app/store/hooks/actions'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LogoSVG } from 'src/shared/ui/icons/logoSVG'
import { BuyTicketModal } from 'src/modals/buy-ticket-modal/buy-ticket-modal'

export const MainNavigation = () => {
	const { openModal } = useActions()
	const location = useLocation()
	const navigate = useNavigate()

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId)
		navigate(sectionId)
		if (element) {
			window.history.pushState(null, '', `#${sectionId}`)

			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	}

	const isPageReload = () => {
		return window.performance
			.getEntriesByType('navigation')
			.map((nav) => (nav as PerformanceNavigationTiming).type)
			.includes('reload')
	}

	useEffect(() => {
		const handleInitialScroll = () => {
			if (location.hash) {
				const sectionId = location.hash.substring(1)
				setTimeout(() => {
					scrollToSection(sectionId)

					if (!isPageReload()) {
						setTimeout(() => {
							navigate(location.pathname, { replace: true })
						}, 1000)
					}
				}, 100)
			}
		}

		handleInitialScroll()

		window.addEventListener('load', handleInitialScroll)
		return () => window.removeEventListener('load', handleInitialScroll)
	}, [location, navigate])

	return (
		<nav className={styles.navigation}>
			<Container className={styles.navigationCont}>
				<LogoSVG />
				<BurgerMenu />
				<ul className={styles.navWrapper}>
					{navigationElements.map((el, index) => (
						<button key={index} className={styles.navEl} onClick={() => scrollToSection(el.link)}>
							<li>{el.title}</li>
						</button>
					))}
				</ul>
				<button className={styles.buyBtn} onClick={() => openModal(<BuyTicketModal id='1' />)}>
					<div className={styles.text}>
						<p>Купить билет</p>
						<p>от 8 000 ₽</p>
					</div>
				</button>
			</Container>
		</nav>
	)
}
