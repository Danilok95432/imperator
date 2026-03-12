import { useState, useMemo } from 'react'
import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { Pagination } from 'src/widgets/pagination/pagination'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { CoctailCard } from './components/coctail-card/coctail-card'
import { mockCoctailCandies } from 'src/mock/coctail'

let ITEMS_PER_PAGE = 9

export const CoctailList = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const breakPoint = useBreakPoint()

	if (breakPoint === 'S') ITEMS_PER_PAGE = 8

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const endIndex = startIndex + ITEMS_PER_PAGE
	const currentItems = mockCoctailCandies.slice(startIndex, endIndex)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const paginationData = useMemo(() => {
		const totalItems = mockCoctailCandies.length
		const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		const endIndex = startIndex + ITEMS_PER_PAGE
		const currentItems = mockCoctailCandies.slice(startIndex, endIndex)

		return {
			totalItems,
			totalPages,
			currentItems,
			startIndex: startIndex + 1,
			endIndex: Math.min(endIndex, totalItems),
		}
	}, [mockCoctailCandies, currentPage, ITEMS_PER_PAGE])

	return (
		<Container className={styles.cont}>
			<div className={styles.grid}>
				{currentItems.map((coctail) => (
					<CoctailCard key={coctail.id} coctail={coctail} />
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
