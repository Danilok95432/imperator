import styles from './index.module.scss'

type Props = {
	itemsTotal: number
	deliveryPrice: number
	totalPrice: number
}

export const OrderSummary = ({ itemsTotal, deliveryPrice, totalPrice }: Props) => {
	return (
		<div className={styles.card}>
			<div className={styles.row}>
				<span>Товаров на:</span>
				<p>{itemsTotal.toLocaleString('ru-RU')} ₽</p>
			</div>

			<div className={styles.row}>
				<span>Доставка:</span>
				<p>{deliveryPrice.toLocaleString('ru-RU')} ₽</p>
			</div>

			<div className={styles.divider} />

			<div className={styles.totalRow}>
				<span>Итого:</span>
				<p>{totalPrice.toLocaleString('ru-RU')} ₽</p>
			</div>
		</div>
	)
}
