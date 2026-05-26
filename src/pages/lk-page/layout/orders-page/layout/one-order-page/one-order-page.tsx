import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'
import styles from './index.module.scss'
import { Link, useParams } from 'react-router-dom'
import { orders } from 'src/mock/orders'
import { OneOrder } from '../one-order/one-order'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additionalCrumbs'
import { formatDate } from 'src/shared/helpers/utils'
import { useGetUserOrdersListItemInfoQuery } from 'src/features/catalog/api/catalog.api'

export const OneOrderPage = () => {
	const { id = '' } = useParams()
	const { data } = useGetUserOrdersListItemInfoQuery(id)
	const order = orders.find((order) => order.id === id)
	useAdditionalCrumbs(`Заказ № ${order?.id} от ${formatDate(order?.order_date ?? '')}`)
	return (
		<Section className={styles.section}>
			<Container className={styles.cont}>
				<h1
					className={styles.title}
				>{`Заказ № ${order?.id} от ${formatDate(order?.order_date ?? '')}`}</h1>
				<Link
					to={
						order?.status_keyword === 'completed'
							? `/lk/orders/completed`
							: order?.status_keyword === 'canceled'
								? `/lk/orders/canceled`
								: `/lk/orders`
					}
					className={styles.link}
				>
					Назад к списку{' '}
					{order?.status_keyword === 'completed'
						? 'завершенных'
						: order?.status_keyword === 'canceled'
							? 'отмененных'
							: 'активных'}{' '}
					заказов
				</Link>
			</Container>
			<OneOrder order={order} />
		</Section>
	)
}
