import { ChocolateList } from './components/chocolate-list/chocolate-list'
import { ReviewSection } from 'src/shared/sections/ReviewsSection/reviews-section'

import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Section } from 'src/shared/ui/Section/section'

export const ChocolatePage = () => {
	return (
		<Section className={styles.chocolatePage}>
			<Container className={styles.cont}>
				<FlexRow className={styles.headRow}>
					<h2 className={styles.title}>{'Шоколад'}</h2>
				</FlexRow>
			</Container>
			<ChocolateList />
			<ReviewSection />
		</Section>
	)
}
