import { Section } from 'src/shared/ui/Section/section'
import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { OneOrder } from '../one-order/one-order'
import { useGetUserOrdersListQuery } from 'src/features/catalog/api/catalog.api'
import { userID } from 'src/shared/helpers/consts'

export const CurrentOrders = () => {
	const { data: ordersData } = useGetUserOrdersListQuery({ idUser: userID ?? '' })
	return (
		<Section className={styles.currentOrders}>
			<Container>
				<FlexRow className={styles.ordersList}>
					{ordersData?.orders.length === 0 && (
						<p className={styles.noOrders}>У вас нет текущих заказов</p>
					)}
					{ordersData?.orders
						.filter((order) => order.status_keyword === 'created')
						.map((order) => {
							return <OneOrder key={order.id} order={order} />
						})}
				</FlexRow>
			</Container>
		</Section>
	)
}
