import React, { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'
import {
	useGetEventNewsByIdQuery,
	useGetEventVideosByIdQuery,
} from 'src/features/home/api/home.api'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { NewsCard } from 'src/shared/sections/NewsSection/components/NewsCard/news-card'
import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'
import { MobileList } from 'src/widgets/mobile-list/mobile-list'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { CommonCheckbox } from 'src/widgets/CommonCheckbox/common-checkbox'
import { type VideoItem } from 'src/types/videos'
import { type CardNewsItem } from 'src/types/news'
import { VideoCard } from 'src/shared/sections/VideosSection/components/video-card/video-card'
import { Pagination } from 'src/widgets/pagination/pagination'

export const NewsPage = () => {
	const { data: newsList = [] } = useGetEventNewsByIdQuery('1')
	const { data: videos = [] } = useGetEventVideosByIdQuery('1')
	const breakpoint = useBreakPoint()
	const [isChecked, setIsChecked] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 8 // Количество элементов на странице

	const handleCheckboxChange = (checked: boolean) => {
		setIsChecked(checked)
		setCurrentPage(1) // Сбрасываем на первую страницу при изменении фильтра
	}

	// Создаем объединенный и отсортированный список
	const mixedAndSortedList = useMemo(() => {
		if (isChecked) {
			return videos
				.map((video) => ({
					...video,
					date: video.date || new Date().toISOString(),
				}))
				.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		}

		const newsWithType = newsList.map((news) => ({
			...news,
			date: news.date || new Date().toISOString(),
		}))

		const videosWithType = videos.map((video) => ({
			...video,
			date: video.date || new Date().toISOString(),
		}))

		return [...newsWithType, ...videosWithType].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		)
	}, [newsList, videos, isChecked])

	// Вычисляем данные для пагинации
	const paginationData = useMemo(() => {
		const totalItems = mixedAndSortedList.length
		const totalPages = Math.ceil(totalItems / itemsPerPage)

		// Получаем элементы для текущей страницы
		const startIndex = (currentPage - 1) * itemsPerPage
		const endIndex = startIndex + itemsPerPage
		const currentItems = mixedAndSortedList.slice(startIndex, endIndex)

		return {
			totalItems,
			totalPages,
			currentItems,
			startIndex: startIndex + 1,
			endIndex: Math.min(endIndex, totalItems),
		}
	}, [mixedAndSortedList, currentPage, itemsPerPage])

	// Обработчик изменения страницы
	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		// Прокручиваем к началу списка
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	// Функция для рендеринга элемента в зависимости от типа
	const renderItem = (item: VideoItem | CardNewsItem) => {
		if ('duration' in item) {
			return <VideoCard key={item.id} shouldDate {...item} />
		}
		return <NewsCard key={item.id} titleLink {...item} />
	}

	return (
		<>
			<Helmet>
				<title>Новости и видео</title>
			</Helmet>
			<Section className={styles.newsListPage}>
				<Container className={styles.newsContainer}>
					<Link to={'/'} className={styles.linkBack}>
						Назад на главную
					</Link>
					<FlexRow className={styles.titleRow}>
						<h2 className={styles.title}>Новости</h2>
						<CommonCheckbox
							checked={isChecked}
							onChange={handleCheckboxChange}
							label='Только видео'
						/>
					</FlexRow>

					{/* Информация о пагинации
					{paginationData.totalItems > 0 && (
						<div className={styles.paginationInfo}>
							Показано {paginationData.startIndex}-{paginationData.endIndex} из{' '}
							{paginationData.totalItems}
						</div>
					)}
						*/}

					{paginationData.currentItems.length > 0 ? (
						breakpoint === 'S' ? (
							<MobileList
								items={mixedAndSortedList}
								renderItem={renderItem}
								classListItems={styles.newsList}
							/>
						) : (
							<>
								<div className={styles.newsList}>
									{paginationData.currentItems.map((item) => renderItem(item))}
								</div>
								{paginationData.totalPages > 1 && (
									<Pagination
										currentPage={currentPage}
										totalPages={paginationData.totalPages}
										onPageChange={handlePageChange}
										className={styles.pagination}
									/>
								)}
							</>
						)
					) : (
						<p className={styles.newsAbsence}>
							{isChecked ? 'Нет доступных видео.' : 'Нет доступных новостей или видео.'}
						</p>
					)}
				</Container>
			</Section>
		</>
	)
}
