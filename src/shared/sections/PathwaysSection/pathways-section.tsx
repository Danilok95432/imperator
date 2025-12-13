import { Section } from 'src/shared/ui/Section/section'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { Placement } from 'src/widgets/placement/placement'

export const PathwaysSection = () => {
	const { data: eventInfo } = useGetEventByIdQuery('1')
	return (
		<Section id='pathways' className={cn(styles.pathways)}>
			<Container>
				<div className={styles.mapTab}>
					<h2>Как добраться</h2>
					<section className={styles.mapSection}>
						<Placement placeVariants={eventInfo?.pathways} />
					</section>
				</div>
			</Container>
		</Section>
	)
}
