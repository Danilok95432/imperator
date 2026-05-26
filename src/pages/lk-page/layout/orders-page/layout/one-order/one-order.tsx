/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { formatDate, getItemsWord } from 'src/shared/helpers/utils'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { OrderSummary } from '../../../cart-page/components/order-summary/order-summary'
import styles from './index.module.scss'
import { useState } from 'react'
import { type OrderItem } from 'src/types/order'
import { useCancelOrderItemMutation } from 'src/features/catalog/api/catalog.api'
import { useActions } from 'src/app/store/hooks/actions'
import { ConfirmWindow } from 'src/modals/confirmActionModal/confirmActionModal'

type OneOrderProps = {
	order?: OrderItem
}

export const OneOrder = ({ order }: OneOrderProps) => {
	const [openItemsByOrderId, setOpenItemsByOrderId] = useState<Record<string, boolean>>({})
	const [cancelOrder] = useCancelOrderItemMutation()

	const toggleItems = (orderId: string | number) => {
		const key = String(orderId)

		setOpenItemsByOrderId((prev) => ({
			...prev,
			[key]: !(prev[key] ?? false),
		}))
	}

	const handleCancelOrder = async (id: string) => {
		try {
			await cancelOrder(id).unwrap()
		} catch (error) {
			console.error('Ошибка при отмене заказа:', error)
		}
	}

	const { openModal } = useActions()

	const cancelItemOrder = (id?: string | number) => {
		if (!id) return

		openModal(
			<ConfirmWindow
				text='Вы действительно хотите отменить заказ? Отменить это действие будет нельзя'
				submitHandle={() => {
					void handleCancelOrder(String(id))
				}}
				link='/lk/orders'
				actionBtnText='Да, отменить заказ'
				cancelBtnText='Нет, оставить заказ'
			/>,
		)
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
								Заказ {`№ ${order.items_count}`}{' '}
								<span>{`от ${formatDate(order.order_date ?? '')}`}</span>
							</p>
							<p>{`${order.order_items.length} ${getItemsWord(order.order_items.length)} на сумму ${order.price_total} ₽`}</p>
						</FlexRow>
						<p className={styles.orderNumber}>
							{`Отменен`} <span>{`${order.deliverDate}`}</span>
						</p>
					</FlexRow>
				</FlexRow>
			) : (
				<FlexRow className={styles.orderInfo}>
					<p className={styles.orderNumber}>
						Заказ {`№ ${order?.id}`} <span>{`от ${formatDate(order?.order_date ?? '')}`}</span>
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
								{order?.order_items?.length} {getItemsWord(order?.order_items?.length ?? 0)}
							</span>

							<span className={styles.itemsToggleIcon} />
						</button>

						<div className={`${styles.itemsPanel} ${isItemsOpen ? styles.itemsPanelOpen : ''}`}>
							<div className={styles.itemsPanelInner}>
								<div className={styles.items}>
									{order?.order_items?.map((item) => (
										<div key={item.id} className={styles.itemRow}>
											<div className={styles.itemName}>{item.item_name}</div>

											<div className={styles.itemQty}>{item.item_count} шт.</div>

											<div className={styles.itemPrice}>{parseFloat(item.item_price)} ₽</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.step}>
						<h2 className={styles.stepTitle}>Доставка</h2>
						<p className={styles.text}>{order?.delivery}</p>
					</div>
					<div className={styles.step}>
						<h2 className={styles.stepTitle}>Статус</h2>
						<FlexRow className={styles.stepContent}>
							<p className={styles.text}>{order?.status}</p>
							<p
								className={styles.text}
							>{`Доставим до: ${formatDate(order?.delivery_date ?? '')}`}</p>
						</FlexRow>
					</div>
					{order?.status === 'Создан' && (
						<FlexRow className={styles.submitRow}>
							{/* <MainButton type='submit' className={styles.submitBtn}>
								Изменить заказ
							</MainButton> */}
							<MainButton
								type='button'
								className={styles.backBtn}
								onClick={async () => cancelItemOrder(order?.id)}
							>
								Отменить заказ
							</MainButton>
						</FlexRow>
					)}
				</FlexRow>
				<aside className={styles.sidebar}>
					<OrderSummary
						itemsTotal={order?.price_items ?? '0.00'}
						deliveryPrice={order?.price_delivery ?? '0.00'}
						totalPrice={order?.price_total ?? '0.00'}
					/>
				</aside>
			</FlexRow>
		</FlexRow>
	)
}
