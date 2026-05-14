import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Section } from 'src/shared/ui/Section/section'
import styles from './index.module.scss'
import { orders } from 'src/mock/orders'
import { getItemsWord } from 'src/shared/helpers/utils'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { AppRoute } from 'src/app/router/consts'
import { useNavigate } from 'react-router-dom'

export const CanceledOrders = () => {
	const navigate = useNavigate()
	return (
		<Section className={styles.cancelledOrders}>
			<Container>
				<FlexRow className={styles.ordersList}>
					{orders
						.filter((order) => order.type === 'canceled')
						.map((order) => {
							return (
								<FlexRow className={styles.order} key={order.id}>
									<FlexRow className={styles.orderInfo}>
										<FlexRow className={styles.orderRow}>
											<FlexRow className={styles.orderNumberRow}>
												<p className={styles.orderNumber}>
													Заказ {`№ ${order.number}`} <span>{`от ${order.date}`}</span>
												</p>
												<p>{`${order.items.length} ${getItemsWord(order.items.length)} на сумму ${order.totalPrice} ₽`}</p>
											</FlexRow>
											<p className={styles.orderNumber}>
												{`Отменен`} <span>{`${order.deliverDate}`}</span>
											</p>
										</FlexRow>
									</FlexRow>
									<MainButton
										type='button'
										className={styles.moreBtn}
										onClick={() => navigate(`${AppRoute.LK}/${AppRoute.LKorders}/${order.id}`)}
									>
										Подробнее о заказе
									</MainButton>
								</FlexRow>
							)
						})}
				</FlexRow>
			</Container>
		</Section>
	)
}
