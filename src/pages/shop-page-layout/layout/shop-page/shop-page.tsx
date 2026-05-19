import { useGetFooterPageInfoQuery } from 'src/features/home/api/home.api'
import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

export const ShopPage = () => {
	const { data } = useGetFooterPageInfoQuery('how')
	return (
		<div className={styles.elementPage}>
			<h2 className={styles.title}>{data?.page_name}</h2>
			<FlexRow className={styles.content}>
				<p className={styles.desc}>
					{data?.page_text && (
						<div className={styles.desc} dangerouslySetInnerHTML={{ __html: data.page_text }} />
					)}
				</p>
			</FlexRow>
		</div>
	)
}
