import { Container } from 'src/shared/ui/Container/Container'
import styles from './index.module.scss'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BurgerMenu } from './burger-menu/burger-menu'
import { useGetCategoriesCatalogQuery } from 'src/features/catalog/api/catalog.api'

export const MainNavigation = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { data } = useGetCategoriesCatalogQuery(null)

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
				<BurgerMenu />
				<ul className={styles.navWrapper}>
					{data?.catalogs.map((el, index) => (
						<button
							key={index}
							className={styles.navEl}
							onClick={() => scrollToSection(`/catalog/${el.id}`)}
						>
							<li>{el.title}</li>
						</button>
					))}
				</ul>
			</Container>
		</nav>
	)
}
