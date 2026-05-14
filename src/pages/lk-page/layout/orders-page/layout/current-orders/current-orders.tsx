import { Section } from 'src/shared/ui/Section/section'
import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { orders } from 'src/mock/orders'
import { OneOrder } from '../one-order/one-order'

export const CurrentOrders = () => {
	return (
		<Section className={styles.currentOrders}>
			<Container>
				<FlexRow className={styles.ordersList}>
					{orders
						.filter((order) => order.type === 'current')
						.map((order) => {
							return <OneOrder key={order.id} order={order} />
						})}
				</FlexRow>
			</Container>
		</Section>
	)
}
