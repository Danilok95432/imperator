import { useState, useMemo } from 'react'
import styles from './index.module.scss'
import { mockChocolates } from 'src/mock/chocolate'
import { Container } from 'src/shared/ui/Container/Container'
import { ChocolateCard } from './components/chocolate-card/chocolate-card'
import { Pagination } from 'src/widgets/pagination/pagination'

const ITEMS_PER_PAGE = 9

export const ChocolateList = () => {
	const [currentPage, setCurrentPage] = useState(1)

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const endIndex = startIndex + ITEMS_PER_PAGE
	const currentItems = mockChocolates.slice(startIndex, endIndex)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	// Функция для генерации массива страниц с троеточием
	const paginationData = useMemo(() => {
		const totalItems = mockChocolates.length
		const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

		// Получаем элементы для текущей страницы
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		const endIndex = startIndex + ITEMS_PER_PAGE
		const currentItems = mockChocolates.slice(startIndex, endIndex)

		return {
			totalItems,
			totalPages,
			currentItems,
			startIndex: startIndex + 1,
			endIndex: Math.min(endIndex, totalItems),
		}
	}, [mockChocolates, currentPage, ITEMS_PER_PAGE])

	return (
		<Container className={styles.container}>
			<div className={styles.grid}>
				{currentItems.map((chocolate) => (
					<ChocolateCard key={chocolate.id} chocolate={chocolate} />
				))}
			</div>

			{paginationData.totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={paginationData.totalPages}
					onPageChange={handlePageChange}
					className={styles.pagination}
				/>
			)}
		</Container>
	)
}
