import { Section } from 'src/shared/ui/Section/section'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { useGetEventProgramByIdQuery } from 'src/features/home/api/home.api'
import { Program } from 'src/widgets/program/program'

export const SubEventsSection = () => {
	const { data: programDays } = useGetEventProgramByIdQuery('1')
	return (
		<Section className={cn(styles.subEvents)}>
			<Container>
				<div className={styles.programTab}>
					<FlexRow className={styles.headProgram}>
						<h2>Подсобытия</h2>
					</FlexRow>
					<Program programDays={programDays ?? []} parentView={'tab'} defaultActiveDay={1} />
				</div>
			</Container>
		</Section>
	)
}
