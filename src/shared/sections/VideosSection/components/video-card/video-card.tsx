import { type FC } from 'react'
import { type VideoItem } from 'src/types/videos'

import cn from 'classnames'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'
import { PlayVideoSVG } from 'src/shared/ui/icons/playVideoSVG'
import { mainFormatDate } from 'src/shared/helpers/utils'

type VideoCardProps = {
	className?: string
	shouldDate?: boolean
} & VideoItem

export const VideoCard: FC<VideoCardProps> = ({
	className,
	id,
	title,
	mainphoto,
	duration,
	date,
	shouldDate = false,
}) => {
	return (
		<Link className={cn(styles.videoCard, className)} to={`/content/videos/${id}`}>
			<div className={styles.videoThumbWrapper}>
				<img src={mainphoto[0]?.original} alt={title} />
				<div className={styles.playVector}>
					<PlayVideoSVG />
				</div>
			</div>
			<p className={styles.videoTitle}>{title}</p>
			{date && shouldDate && (
				<span className={styles.date}>{mainFormatDate(date, 'dd.MM.yyyy')}</span>
			)}
		</Link>
	)
}
