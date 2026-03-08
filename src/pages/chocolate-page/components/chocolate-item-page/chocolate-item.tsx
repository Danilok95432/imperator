import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Section } from 'src/shared/ui/Section/section'

import styles from './index.module.scss'
import { BreadCrumbs } from 'src/widgets/breadcrumbs/bread-crumbs'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additionalCrumbs'
import { useParams } from 'react-router-dom'
import { mockChocolates } from 'src/mock/chocolate'

export const ChocolateItem = () => {
	const { id } = useParams()
	const chocolate = mockChocolates.find((el) => el.id === id)
	useAdditionalCrumbs(chocolate?.title)
	return (
		<Section className={styles.chocolatePage}>
			<Container className={styles.cont}>
				<FlexRow className={styles.headRow}>
					<BreadCrumbs
						crumbsLinksMap={[
							{
								title: 'Шоколад',
								link: 'chocolate',
							},
						]}
					/>
				</FlexRow>
			</Container>
		</Section>
	)
}
