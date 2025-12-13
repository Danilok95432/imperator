import { Section } from 'src/shared/ui/Section/section'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { DownloadIconSVG } from 'src/shared/ui/icons/downloadIconSVG'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { RegEventGuestModal } from 'src/modals/reg-guest-modal/reg-guest-modal'
import { useActions } from 'src/app/store/hooks/actions'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { RegEventPartModal } from 'src/modals/reg-part-modal/reg-part-modal'

export const EventsSection = () => {
	const breakpoint = useBreakPoint()
	const { openModal } = useActions()
	const { data: eventData } = useGetEventByIdQuery('1')
	return (
		<Section id='events' className={cn(styles.events)}>
			<Container>
				<FlexRow className={styles.eventsSectionRow}>
					<h2>События</h2>
					{breakpoint === 'S' ? null : (
						<MainButton as='route' to={`https://этноспорт.рф/events`}>
							Все события
						</MainButton>
					)}
				</FlexRow>
				<FlexRow className={styles.eventInfoWrapper}>
					<FlexRow className={styles.infoRow}>
						<p className={styles.eventTile}>{eventData?.infoblock?.title}</p>
						<div className={eventData?.infoblock?.short ? styles.eventDesc : ''}>
							{eventData?.infoblock?.short && (
								<div dangerouslySetInnerHTML={{ __html: eventData?.infoblock?.short }} />
							)}
						</div>
						<a href={eventData?.infoblock?.link_url ?? '#'} className={styles.linkEvent}>
							<span>{eventData?.infoblock?.link_text}</span>
							<DownloadIconSVG />
						</a>
						<FlexRow className={styles.regLinks}>
							{eventData?.infoblock?.reg_guests && (
								<MainButton onClick={() => openModal(<RegEventGuestModal id={'1'} />)}>
									Регистрация гостей
								</MainButton>
							)}
							{eventData?.infoblock?.reg_participants && (
								<MainButton
									className={styles.headerBtn}
									onClick={() => openModal(<RegEventPartModal id={'1'} />)}
								>
									Регистрация участников
								</MainButton>
							)}
						</FlexRow>
					</FlexRow>
					<div className={styles.imgWrapper}>
						{eventData?.infoblock?.photo && eventData?.infoblock?.photo.length > 0 ? (
							<img src={eventData?.infoblock?.photo[0].original} alt='#' />
						) : (
							<img src='src/assets/img/traditionJPG.jpg' alt='#' />
						)}
					</div>
				</FlexRow>
			</Container>
		</Section>
	)
}
