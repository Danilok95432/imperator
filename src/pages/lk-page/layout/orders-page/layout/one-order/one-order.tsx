import { getItemsWord } from 'src/shared/helpers/utils'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { OrderSummary } from '../../../cart-page/components/order-summary/order-summary'
import styles from './index.module.scss'
import { useState } from 'react'
import { type OrderItem } from 'src/types/order'

type OneOrderProps = {
	order?: OrderItem
}

export const OneOrder = ({ order }: OneOrderProps) => {
	const [openItemsByOrderId, setOpenItemsByOrderId] = useState<Record<string, boolean>>({})

	const toggleItems = (orderId: string | number) => {
		const key = String(orderId)

		setOpenItemsByOrderId((prev) => ({
			...prev,
			[key]: !(prev[key] ?? false),
		}))
	}
	const orderKey = String(order?.id)
	const isItemsOpen = openItemsByOrderId[orderKey] ?? false
	return (
		<FlexRow className={styles.order} key={order?.id}>
			{order?.type === 'completed' || order?.type === 'canceled' ? (
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
			) : (
				<FlexRow className={styles.orderInfo}>
					<p className={styles.orderNumber}>
						Заказ {`№ ${order?.number}`} <span>{`от ${order?.date}`}</span>
					</p>
				</FlexRow>
			)}
			<FlexRow className={styles.orderBlock}>
				<FlexRow className={styles.orderSteps}>
					<div key={order?.id} className={styles.step}>
						<button
							type='button'
							className={`${styles.itemsToggle} ${isItemsOpen ? styles.itemsToggleActive : ''}`}
							onClick={() => toggleItems(order?.id ?? '0')}
							aria-expanded={isItemsOpen}
						>
							<span className={styles.itemsToggleText}>
								{order?.items?.length} {getItemsWord(order?.items?.length ?? 0)}
							</span>

							<span className={styles.itemsToggleIcon} />
						</button>

						<div className={`${styles.itemsPanel} ${isItemsOpen ? styles.itemsPanelOpen : ''}`}>
							<div className={styles.itemsPanelInner}>
								<div className={styles.items}>
									{order?.items?.map((item) => (
										<div key={item.id} className={styles.itemRow}>
											<div className={styles.itemName}>{item.title}</div>

											<div className={styles.itemQty}>{item.quantity} шт.</div>

											<div className={styles.itemPrice}>
												{(item.price * item.quantity).toLocaleString('ru-RU')}.00 ₽
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.step}>
						<h2 className={styles.stepTitle}>Доставка</h2>
						<p className={styles.text}>{order?.deliver}</p>
					</div>
					<div className={styles.step}>
						<h2 className={styles.stepTitle}>Статус</h2>
						<FlexRow className={styles.stepContent}>
							<p className={styles.text}>{order?.status}</p>
							<p className={styles.text}>{`Доставим до: ${order?.deliverDate}`}</p>
						</FlexRow>
					</div>
					{order?.type === 'completed' || order?.type === 'canceled' ? (
						<FlexRow className={styles.submitRow}>
							<MainButton type='submit' className={styles.submitBtn}>
								Задать вопрос по заказу
							</MainButton>
						</FlexRow>
					) : (
						<FlexRow className={styles.submitRow}>
							<MainButton type='submit' className={styles.submitBtn}>
								Изменить заказ
							</MainButton>
							<MainButton type='button' className={styles.backBtn}>
								Отменить заказ
							</MainButton>
						</FlexRow>
					)}
				</FlexRow>
				<aside className={styles.sidebar}>
					<OrderSummary
						itemsTotal={order?.itemsTotal ?? '0.00'}
						deliveryPrice={order?.deliveryPrice ?? '0.00'}
						totalPrice={order?.totalPrice ?? '0.00'}
					/>
				</aside>
			</FlexRow>
		</FlexRow>
	)
}
