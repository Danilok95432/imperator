import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
// import { type CardNewsItem } from 'src/types/news'

import styles from './index.module.scss'
import { Section } from 'src/shared/ui/Section/section'
import { Container } from 'src/shared/ui/Container/Container'
import { useGetNewsByIdQuery } from 'src/features/content/api/content'
import { useGetEventNewsByIdQuery } from 'src/features/home/api/home.api'
import { AsideNews } from 'src/widgets/aside-news/aside-news'

export const NewsDetailsNew = () => {
	const { id } = useParams()
	const { data: newsItemData } = useGetNewsByIdQuery(id ?? '')
	const { data: newsList = [] } = useGetEventNewsByIdQuery('1')
	const [, setPreviewCount] = useState<number>(1)
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const calculatePreviewCount = () => {
			if (contentRef.current) {
				const contentHeight = contentRef.current.offsetHeight
				const cardHeight = 252
				const count = Math.floor((contentHeight - 50) / cardHeight)
				setPreviewCount(Math.max(1, count))
			}
		}

		calculatePreviewCount()
		window.addEventListener('resize', calculatePreviewCount)

		return () => {
			window.removeEventListener('resize', calculatePreviewCount)
		}
	}, [newsItemData])

	if (!newsItemData) return null
	return (
		<>
			<Helmet>
				<title>{newsItemData?.title}</title>
			</Helmet>
			<div className={styles.newsItemPage}>
				<Section className={styles.newsListPage}>
					<Container className={styles.newsContainer}>
						<div className={styles.newsItemPageContent} ref={contentRef}>
							<Link to={'/'} className={styles.linkBack}>
								Назад на главную
							</Link>
							<img src={newsItemData?.mainphoto[0].original} alt='' />
							<div className={styles.newsItemInfoContent}>
								<div className={styles.contentInfo}>
									<h2>{newsItemData.title}</h2>
									<div className={newsItemData?.short ? styles.newsShortDescs : ''}>
										{newsItemData?.short && (
											<div dangerouslySetInnerHTML={{ __html: newsItemData.short }} />
										)}
									</div>
									<div className={styles.newsDescs}>
										{newsItemData?.full && (
											<div dangerouslySetInnerHTML={{ __html: newsItemData.full }} />
										)}
									</div>
								</div>
							</div>
							<div className={styles.asideNewsDetails}>
								<AsideNews currentNewsId={id ?? ''} newsList={newsList} previewCount={4} />
							</div>
							<Link to={'/'} className={styles.linkBack}>
								Назад на главную
							</Link>
						</div>
					</Container>
				</Section>
			</div>
		</>
	)
}
