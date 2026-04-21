import { useState, useMemo } from 'react'
import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { Pagination } from 'src/widgets/pagination/pagination'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { CoctailCard } from './components/coctail-card/coctail-card'
import { mockCoctailCandies } from 'src/mock/coctail'
import { useGetCatalogQuery } from 'src/features/catalog/api/catalog.api'
import { Loader } from 'src/shared/ui/loader/loader'

let ITEMS_PER_PAGE = 9

export const CoctailList = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const { data, isLoading } = useGetCatalogQuery({
		id: '4',
		limit: String(ITEMS_PER_PAGE),
		step: String(currentPage),
	})
	const breakPoint = useBreakPoint()

	if (breakPoint === 'S') ITEMS_PER_PAGE = 8

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const endIndex = startIndex + ITEMS_PER_PAGE
	const currentItems = data?.items
		? data?.items.slice(startIndex, endIndex)
		: mockCoctailCandies.slice(startIndex, endIndex)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const paginationData = useMemo(() => {
		const totalItems = data?.totalitems ?? data?.items.length ?? 1
		const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		const endIndex = startIndex + ITEMS_PER_PAGE
		const currentItems = data?.items
			? data?.items.slice(startIndex, endIndex)
			: mockCoctailCandies.slice(startIndex, endIndex)

		return {
			totalItems,
			totalPages,
			currentItems,
			startIndex: startIndex + 1,
			endIndex: Math.min(endIndex, totalItems),
		}
	}, [mockCoctailCandies, currentPage, ITEMS_PER_PAGE])

	if (!data?.items || isLoading) return <Loader />
	return (
		<Container className={styles.cont}>
			<div className={styles.grid}>
				{currentItems.length > 1 ? (
					currentItems.map((chocolate) => <CoctailCard key={chocolate.id} coctail={chocolate} />)
				) : (
					<p className={styles.noItems}>Нет товаров</p>
				)}
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
