import React, { useEffect, useRef, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import { Link, useParams } from 'react-router-dom'

import styles from './index.module.scss'
import { useGetEventVideosByIdQuery } from 'src/features/home/api/home.api'
import { useGetVideoByIdQuery } from 'src/features/content/api/content'
import { AsideVideos } from 'src/widgets/aside-videos/aside-videos'
import { Section } from 'src/shared/ui/Section/section'
import { Container } from 'src/shared/ui/Container/Container'

export const VideoDetails: FC = () => {
	const { id } = useParams()
	const { data: videoDetails } = useGetVideoByIdQuery(id ?? '')
	const { data: videosList = [] } = useGetEventVideosByIdQuery('1')

	const [isSmallScreen, setIsSmallScreen] = useState(false)
	const [, setPreviewCount] = useState<number>(1)
	const contentRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 1300)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	useEffect(() => {
		const calculatePreviewCount = () => {
			if (contentRef.current) {
				const contentHeight = contentRef.current.offsetHeight
				const cardHeight = 190
				const count = Math.floor((contentHeight - 50) / cardHeight)
				setPreviewCount(Math.max(1, count))
			}
		}

		calculatePreviewCount()
		window.addEventListener('resize', calculatePreviewCount)

		return () => {
			window.removeEventListener('resize', calculatePreviewCount)
		}
	}, [videoDetails])

	if (!videoDetails) return

	return (
		<>
			<Helmet>
				<title>{videoDetails?.title}</title>
			</Helmet>
			<Section>
				<Container>
					<div className={styles.videoDetailPage}>
						<Link to={'/'} className={styles.linkBack}>
							Назад на главную
						</Link>
						<div className={styles.mainVideo}>
							<iframe
								src={videoDetails.url ?? ''}
								allow='encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;'
								allowFullScreen
							></iframe>
						</div>
						<div className={styles.videoContent} ref={contentRef}>
							<div className={styles.contentInfo}>
								<h2>{videoDetails?.title}</h2>
								<div className={styles.descVideo}>
									<p className={styles.descVideoText}>{videoDetails?.short}</p>
								</div>
							</div>
						</div>
						<AsideVideos
							videosList={videosList}
							title='Похожие видео'
							orient={isSmallScreen ? 'horizontal' : 'vertical'}
							currentVideoId={id}
							previewCount={4}
						/>
						<Link to={'/'} className={styles.linkBack}>
							Назад на главную
						</Link>
					</div>
				</Container>
			</Section>
		</>
	)
}
