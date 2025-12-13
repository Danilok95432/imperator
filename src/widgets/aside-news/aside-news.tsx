import { type RefObject, useRef, type FC, useState, useEffect } from 'react'
import { type CardNewsItem } from 'src/types/news'

import styles from './index.module.scss'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { SliderBtns } from '../slider-btns/slider-btns'
import { Link } from 'react-router-dom'
import { newsSliderOptions } from './consts'
import { mainFormatDate } from 'src/shared/helpers/utils'

type AsideNewsProps = {
	previewCount?: number
	currentNewsId?: string
	newsList?: CardNewsItem[]
}

export const AsideNews: FC<AsideNewsProps> = ({
	currentNewsId = '',
	newsList,
	previewCount = 0,
}) => {
	const [isSmallScreen, setIsSmallScreen] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 1448)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	if (!newsList) return null

	// Сортируем новости по дате (от новых к старым)
	const sortedNews = [...newsList].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	)

	return (
		<aside className={styles.asideNews}>
			<p className={styles.asideNewsTitle}>Другие новости</p>
			{isSmallScreen ? (
				<div className='slider-with-btns'>
					<Swiper {...newsSliderOptions} ref={swiperRef}>
						{sortedNews.map((newsEl, idx) => (
							<SwiperSlide className={styles.newsSlide} key={idx}>
								<Link
									to={`/content/news/${newsEl.id}`}
									aria-label={newsEl.title}
									title={newsEl.title}
								>
									<div className={styles.asideNewsCard} key={newsEl.id}>
										<img
											src={newsEl.mainphoto[0]?.original}
											alt={newsEl.title}
											width={286}
											height={160}
											loading='lazy'
										/>
										<p className={styles.asideNewsCardTitle}>{newsEl.title}</p>
										<p className={styles.asideNewsCardDate}>{mainFormatDate(newsEl.date)}</p>
									</div>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
					<SliderBtns className={styles.newsSliderBtns} swiperRef={swiperRef} color={'#5C5C5C'} />
				</div>
			) : (
				<div className={styles.newsList}>
					{sortedNews
						.filter((el) => el.id !== currentNewsId)
						.slice(0, previewCount)
						.map((newsEl) => (
							<Link
								to={`/content/news/${newsEl.id}`}
								aria-label={newsEl.title}
								title={newsEl.title}
								key={newsEl.id}
							>
								<div className={styles.asideNewsCard} key={newsEl.id}>
									<img
										src={newsEl.mainphoto[0]?.original}
										alt={newsEl.title}
										width={286}
										height={160}
										loading='lazy'
									/>
									<p className={styles.asideNewsCardTitle}>{newsEl.title}</p>
									<p className={styles.asideNewsCardDate}>
										{mainFormatDate(newsEl.date, 'dd.MM.yyyy')}
									</p>
								</div>
							</Link>
						))}
				</div>
			)}
		</aside>
	)
}
