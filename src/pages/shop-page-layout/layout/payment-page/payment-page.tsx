import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import styles from './index.module.scss'
import { useGetFooterPageInfoQuery } from 'src/features/home/api/home.api'

export const PaymentPage = () => {
	const { data } = useGetFooterPageInfoQuery('payment')
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
			{/* <FlexRow className={styles.rowSection}>
				<FlexRow className={classNames(styles.content, styles.lessGap)}>
					<p className={styles.subtitle}>При доставке СДЕКОМ</p>
					<p className={styles.desc}>
						При доставке шоколада транспортной компанией СДЕК оплата товара и доставки производится
						при получении.
					</p>
				</FlexRow>
				<FlexRow className={classNames(styles.content, styles.lessGap)}>
					<p className={styles.subtitle}>При самовывозе</p>
					<p className={styles.desc}>
						Если Вы забираете свои конфеты и шоколад в нашем магазине сами, стоимость заказа
						оплачивается банковской картой продавцу при получении заказа.
					</p>
				</FlexRow>
			</FlexRow> */}
		</div>
	)
}
