import { useState, useMemo } from 'react'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { Container } from 'src/shared/ui/Container/Container'
import { Pagination } from 'src/widgets/pagination/pagination'

import styles from './index.module.scss'
import { FavoriteCard } from './components/favorite-card/favorite-card'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additionalCrumbs'
import { mockFavorites } from 'src/mock/favorite'

let ITEMS_PER_PAGE = 9

export const FavoriteItems = () => {
	useAdditionalCrumbs('Избранные товары')
	const [currentPage, setCurrentPage] = useState(1)
	const breakPoint = useBreakPoint()

	if (breakPoint === 'S') ITEMS_PER_PAGE = 8

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const endIndex = startIndex + ITEMS_PER_PAGE
	const currentItems = mockFavorites.slice(startIndex, endIndex)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const paginationData = useMemo(() => {
		const totalItems = mockFavorites.length
		const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		const endIndex = startIndex + ITEMS_PER_PAGE
		const currentItems = mockFavorites.slice(startIndex, endIndex)

		return {
			totalItems,
			totalPages,
			currentItems,
			startIndex: startIndex + 1,
			endIndex: Math.min(endIndex, totalItems),
		}
	}, [mockFavorites, currentPage, ITEMS_PER_PAGE])

	return (
		<Container className={styles.cont}>
			<h1 className={styles.title}>Избранные товары</h1>
			<div className={styles.grid}>
				{currentItems.map((candy) => (
					<FavoriteCard key={candy.id} item={candy} />
				))}
			</div>

			{paginationData.totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={paginationData.totalPages}
					onPageChange={handlePageChange}
					className={styles.pagination}
					maxVisiblePages={5}
				/>
			)}
		</Container>
	)
}
