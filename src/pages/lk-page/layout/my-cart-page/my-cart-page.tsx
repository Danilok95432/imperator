import { useMemo, useState } from 'react'
import { type FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'

import { useAdditionalCrumbs } from 'src/app/store/hooks/additionalCrumbs'
import { AppRoute } from 'src/app/router/consts'

import {
	useAddItemToCartMutation,
	useClearCartMutation,
	useDeleteItemFromCartMutation,
	useGetItemsCartQuery,
} from 'src/features/catalog/api/catalog.api'

import { MinusSVG } from 'src/shared/ui/icons/minusSvg'
import { PlusSVG } from 'src/shared/ui/icons/plusSVG'

import skeleton from 'src/assets/img/candy(2).png'
import cn from 'classnames'
import styles from './index.module.scss'
import { userID } from 'src/shared/helpers/consts'

export interface CartListItem {
	id_item: string
	item_name: string
	item_count: string
	item_price: string
	item_fullprice: string
}

export interface CartListItemsResponse {
	items: CartListItem[]
	cart_price: string
}

const formatPrice = (value: string | number) => {
	const normalizedValue = String(value)
		.replace(/\s/g, '')
		.replace(/[^\d.,-]/g, '')
		.replace(',', '.')

	const numberValue = Number(normalizedValue)

	if (Number.isNaN(numberValue)) {
		return `${value} ₽`
	}

	return `${numberValue.toLocaleString('ru-RU', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})} ₽`
}

export const MyCartPage = () => {
	useAdditionalCrumbs('Моя корзина')

	const navigate = useNavigate()

	const { data, isLoading, isFetching, refetch } = useGetItemsCartQuery(userID)

	const [addItemToCart] = useAddItemToCartMutation()
	const [deleteItemFromCart] = useDeleteItemFromCartMutation()
	const [clearCart] = useClearCartMutation()

	const [updatingItemId, setUpdatingItemId] = useState<string | null>(null)
	const [isClearing, setIsClearing] = useState(false)

	const cartData = data as CartListItemsResponse | undefined

	const cartItems = useMemo(() => {
		return cartData?.items ?? []
	}, [cartData])

	const createAddFormData = (idItem: string, count: string) => {
		const formData = new FormData()

		if (userID) {
			formData.append('id_user', userID)
		}

		formData.append('id_item', idItem)
		formData.append('item_count', count)

		return formData
	}

	const createDeleteFormData = (idItem: string) => {
		const formData = new FormData()

		if (userID) {
			formData.append('id_user', userID)
		}

		formData.append('id_item', idItem)

		return formData
	}

	const createClearDeleteFormData = () => {
		const formData = new FormData()
		if (userID) {
			formData.append('id_user', userID)
		}
		return formData
	}

	const handleIncrease = async (e: React.MouseEvent, item: CartListItem, count: string) => {
		e.preventDefault()
		e.stopPropagation()

		try {
			setUpdatingItemId(item.id_item)

			await addItemToCart(createAddFormData(item.id_item, count) as unknown as FieldValues).unwrap()
			await refetch()
		} catch (error) {
			console.error('Ошибка при добавлении товара в корзину:', error)
		} finally {
			setUpdatingItemId(null)
		}
	}

	const handleRemoveFromCart = async (e: React.MouseEvent, item: CartListItem) => {
		e.preventDefault()
		e.stopPropagation()

		try {
			setUpdatingItemId(item.id_item)

			await deleteItemFromCart(
				createDeleteFormData(item.id_item) as unknown as FieldValues,
			).unwrap()
			await refetch()
		} catch (error) {
			console.error('Ошибка при удалении товара из корзины:', error)
		} finally {
			setUpdatingItemId(null)
		}
	}

	const handleClearCart = async () => {
		try {
			setIsClearing(true)

			await clearCart(createClearDeleteFormData()).unwrap()
			await refetch()
		} catch (error) {
			console.error('Ошибка при очистке корзины:', error)
		} finally {
			setIsClearing(false)
		}
	}

	return (
		<Section className={styles.section}>
			<Container className={styles.cont}>
				<h1 className={styles.title}>Моя корзина</h1>

				<FlexRow className={styles.clearRow}>
					<MainButton
						type='button'
						className={styles.clearBtn}
						onClick={handleClearCart}
						disabled={isClearing || cartItems.length === 0}
					>
						{isClearing ? 'Очищаем...' : 'Очистить корзину'}
					</MainButton>
				</FlexRow>

				<FlexRow className={styles.cartRow}>
					{isLoading ? (
						<p>Загрузка корзины...</p>
					) : cartItems.length === 0 ? (
						<p>Корзина пуста</p>
					) : (
						cartItems.map((item) => {
							const count = Number(item.item_count) || 0
							const isItemUpdating = updatingItemId === item.id_item

							return (
								<FlexRow className={styles.elementRow} key={item.id_item}>
									<FlexRow className={styles.contentRow}>
										<img className={styles.img} src={skeleton} alt='' />

										<p className={styles.title}>{item.item_name}</p>
									</FlexRow>

									<FlexRow className={styles.infoRow}>
										<FlexRow className={styles.priceRow}>
											<p className={styles.price}>{formatPrice(item.item_price)}</p>
											<p>цена за 1 шт.</p>
										</FlexRow>

										<MainButton
											type='button'
											className={cn(styles.smallBuyBtn, styles.mobileBuyBtn, {
												[styles.filled]: count > 0,
												[styles.loading]: isItemUpdating,
											})}
											disabled={isItemUpdating || isFetching}
										>
											<FlexRow className={styles.counterCart}>
												<div
													className={styles.vector}
													onClick={async (e) => await handleIncrease(e, item, '-1')}
												>
													<MinusSVG color='#C09F3D' />
												</div>

												<p className={cn(styles.counter)}>{count}</p>

												<div
													className={styles.vector}
													onClick={async (e) => await handleIncrease(e, item, '1')}
												>
													<PlusSVG color='#C09F3D' />
												</div>
											</FlexRow>
										</MainButton>

										<p className={styles.totalPrice}>{formatPrice(item.item_fullprice)}</p>
										<div
											className={styles.deleteVector}
											onClick={async (e) => await handleRemoveFromCart(e, item)}
										></div>
									</FlexRow>
								</FlexRow>
							)
						})
					)}
				</FlexRow>

				<FlexRow className={styles.resultRow}>
					<p>Итого:</p>

					<FlexRow className={styles.resultPriceRow}>
						<p className={styles.price}>{formatPrice(cartData?.cart_price ?? 0)}</p>
					</FlexRow>

					<MainButton
						type='button'
						className={styles.submitBtn}
						disabled={cartItems.length === 0}
						onClick={() => navigate(`/lk/${AppRoute.LKcart}`)}
					>
						Оформить заказ
					</MainButton>
				</FlexRow>
			</Container>
		</Section>
	)
}
