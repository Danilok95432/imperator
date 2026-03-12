import { ReviewSection } from 'src/shared/sections/ReviewsSection/reviews-section'

import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Section } from 'src/shared/ui/Section/section'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export const CandyPage = () => {
	const location = useLocation()
	const insideLocation = location.pathname.split('/').some((segment) => /^\d+$/.test(segment))
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}, [location.pathname])
	return (
		<Section className={styles.candyPage}>
			{!insideLocation && (
				<Container className={styles.cont}>
					<FlexRow className={styles.headRow}>
						<h2 className={styles.title}>{'Конфеты'}</h2>
					</FlexRow>
				</Container>
			)}
			<Outlet />
			<ReviewSection />
		</Section>
	)
}
