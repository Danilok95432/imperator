import { type CardNewsItem } from 'src/types/news'
import cn from 'classnames'
import { type FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'
import { formatSingleDate, mainFormatDate } from 'src/shared/helpers/utils'

type NewsCardProps = {
	className?: string
	mainStatus?: boolean
	titleLink?: boolean
} & CardNewsItem

export const NewsCard: FC<NewsCardProps> = ({
	id,
	mainphoto,
	title,
	date,
	desc,
	mainStatus,
	className,
	titleLink = false,
}) => {
	if (mainStatus) {
		return (
			<Link
				className={cn(styles.newsItem, className)}
				to={`/content/news/${id}`}
				aria-label={title}
				title={title}
			>
				<figure className={styles.mainNewsContainer}>
					<div className={styles.newsImgWrapper}>
						<img src={mainphoto[0]?.original} alt={title} width={286} height={160} loading='lazy' />
					</div>
					<figcaption className={styles.newsItemContent}>
						<h4 className={cn(styles.newsItemTitle, { [styles.linkTitle]: titleLink })}>{title}</h4>
						<p className={styles.newsDate}>{mainFormatDate(date)}</p>
						<p className={styles.newsDesc}>{desc}</p>
					</figcaption>
				</figure>
			</Link>
		)
	}
	return (
		<Link
			className={cn(styles.newsItem, { [styles.contentItem]: titleLink })}
			to={`/content/news/${id}`}
			aria-label={title}
			title={title}
		>
			<figure>
				<div className={styles.newsImgWrapper}>
					<img src={mainphoto[0]?.original} alt={title} width={286} height={160} loading='lazy' />
				</div>
				<figcaption className={styles.newsItemContent}>
					<h4 className={cn(styles.newsItemTitle, { [styles.linkTitle]: titleLink })}>{title}</h4>
					<p className={styles.newsDate}>{formatSingleDate(date)}</p>
					<p className={styles.newsDesc}>{desc}</p>
				</figcaption>
			</figure>
		</Link>
	)
}
