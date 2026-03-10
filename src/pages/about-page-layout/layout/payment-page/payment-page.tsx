import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import styles from './index.module.scss'
import classNames from 'classnames'

export const PaymentPage = () => {
	return (
		<div className={styles.elementPage}>
			<h2 className={styles.title}>Способы оплаты</h2>
			<FlexRow className={styles.rowSection}>
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
			</FlexRow>
		</div>
	)
}
