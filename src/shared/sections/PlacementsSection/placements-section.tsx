import { Section } from 'src/shared/ui/Section/section'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { Placement } from 'src/widgets/placement/placement'

export const PlacementsSection = () => {
	const { data: eventInfo } = useGetEventByIdQuery('1')
	return (
		<Section id='placement' className={cn(styles.placements)}>
			<Container>
				<div className={styles.mapTab}>
					<h2>Размещение</h2>
					<section>
						<Placement placeVariants={eventInfo?.placements} />
					</section>
				</div>
			</Container>
		</Section>
	)
}
