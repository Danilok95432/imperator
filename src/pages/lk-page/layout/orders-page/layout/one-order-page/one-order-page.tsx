import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'
import styles from './index.module.scss'
import { Link, useParams } from 'react-router-dom'
import { orders } from 'src/mock/orders'
import { OneOrder } from '../one-order/one-order'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additionalCrumbs'

export const OneOrderPage = () => {
	const { id = '' } = useParams()
	const order = orders.find((order) => order.id === id)
	useAdditionalCrumbs(`Заказ № ${order?.number} от ${order?.date}`)
	return (
		<Section className={styles.section}>
			<Container className={styles.cont}>
				<h1 className={styles.title}>{`Заказ № ${order?.number} от ${order?.date}`}</h1>
				<Link
					to={
						order?.type === 'completed'
							? `/lk/orders/completed`
							: order?.type === 'canceled'
								? `/lk/orders/canceled`
								: `/lk/orders`
					}
					className={styles.link}
				>
					Назад к списку{' '}
					{order?.type === 'completed'
						? 'завершенных'
						: order?.type === 'canceled'
							? 'отмененных'
							: 'активных'}{' '}
					заказов
				</Link>
			</Container>
			<OneOrder order={order} />
		</Section>
	)
}
