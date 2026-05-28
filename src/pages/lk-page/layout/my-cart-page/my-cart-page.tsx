import { useEffect, useMemo, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { FormProvider, type FieldValues, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { ControlledInput } from 'src/widgets/controlled-input/controlled-input'

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
import { DeleteItemFromCartSVG } from 'src/shared/ui/icons/deleteItemFromCartSVG'
import { useActions } from 'src/app/store/hooks/actions'
import { ConfirmWindow } from 'src/modals/confirmActionModal/confirmActionModal'
import { type ImageItemWithText } from 'src/types/photos'

export interface CartListItem {
	id_item: string
	item_name: string
	item_count: string
	item_price: string
	item_fullprice: string
	img: ImageItemWithText[]
	category_id: string
}

export interface CartListItemsResponse {
	items: CartListItem[]
	cart_price: string
}

type CartCounterFormValues = Record<string, string>

const MAX_ITEM_COUNT = 99

const getCounterName = (idItem: string) => `counter_${idItem}`

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
	const { openModal } = useActions()
	const userID = localStorage.getItem('userID') ?? ''

	const { data, isLoading, isFetching } = useGetItemsCartQuery(userID ?? '')

	const [addItemToCart] = useAddItemToCartMutation()
	const [deleteItemFromCart] = useDeleteItemFromCartMutation()
	const [clearCart] = useClearCartMutation()

	const [updatingItemId, setUpdatingItemId] = useState<string | null>(null)
	const [isClearing, setIsClearing] = useState(false)

	const methods = useForm<CartCounterFormValues>({
		mode: 'onBlur',
	})

	const { getValues, setValue } = methods

	const cartData = data as CartListItemsResponse | undefined

	const cartItems = useMemo(() => {
		return cartData?.items ?? []
	}, [cartData])

	useEffect(() => {
		cartItems.forEach((item) => {
			setValue(getCounterName(item.id_item), String(Number(item.item_count) || 0), {
				shouldDirty: false,
				shouldValidate: false,
			})
		})
	}, [cartItems, setValue])

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

	const resetCounterInput = (item: CartListItem) => {
		setValue(getCounterName(item.id_item), String(Number(item.item_count) || 0), {
			shouldDirty: false,
			shouldValidate: false,
		})
	}

	const changeCartItemCount = async (item: CartListItem, count: string) => {
		const delta = Number(count)
		const currentCount = Number(item.item_count) || 0
		const nextCount = currentCount + delta
		const counterName = getCounterName(item.id_item)

		if (!Number.isFinite(delta) || delta === 0) return
		if (delta < 0 && currentCount <= 0) return

		if (nextCount > MAX_ITEM_COUNT) {
			toast.error('Не более 99 единиц одного товара в одном заказе')

			setValue(counterName, String(MAX_ITEM_COUNT), {
				shouldDirty: false,
				shouldValidate: false,
			})

			return
		}

		if (nextCount < 0) {
			resetCounterInput(item)
			return
		}

		const updateCartItemCount = async () => {
			try {
				setUpdatingItemId(item.id_item)

				await addItemToCart(
					createAddFormData(item.id_item, count) as unknown as FieldValues,
				).unwrap()

				setValue(counterName, String(nextCount), {
					shouldDirty: false,
					shouldValidate: false,
				})
			} catch (error) {
				console.error('Ошибка при изменении товара в корзине:', error)
				resetCounterInput(item)
			} finally {
				setUpdatingItemId(null)
			}
		}

		if (delta < 0 && nextCount === 0) {
			resetCounterInput(item)

			openModal(
				<ConfirmWindow
					text='Вы действительно хотите удалить товар из корзины? Отменить это действие будет нельзя'
					submitHandle={() => {
						void updateCartItemCount()
					}}
					link='/lk/cart'
				/>,
			)

			return
		}

		await updateCartItemCount()
	}

	const handleIncrease = async (e: MouseEvent, item: CartListItem, count: string) => {
		e.preventDefault()
		e.stopPropagation()

		await changeCartItemCount(item, count)
	}

	const handleCounterBlur = async (item: CartListItem) => {
		const counterName = getCounterName(item.id_item)
		const currentCount = Number(item.item_count) || 0

		const rawValue = String(getValues(counterName) ?? '')
		const normalizedValue = rawValue.replace(/\D/g, '')

		if (!normalizedValue) {
			resetCounterInput(item)
			return
		}

		let nextCount = Number(normalizedValue)

		if (!Number.isFinite(nextCount) || nextCount < 0) {
			resetCounterInput(item)
			return
		}

		if (nextCount > MAX_ITEM_COUNT) {
			toast.error('Не более 99 единиц одного товара в одном заказе')
			nextCount = MAX_ITEM_COUNT

			setValue(counterName, String(MAX_ITEM_COUNT), {
				shouldDirty: false,
				shouldValidate: false,
			})
		}

		if (nextCount === currentCount) {
			setValue(counterName, String(currentCount), {
				shouldDirty: false,
				shouldValidate: false,
			})
			return
		}

		const delta = nextCount - currentCount

		await changeCartItemCount(item, String(delta))
	}

	const handleRemoveFromCart = async (e: MouseEvent, item: CartListItem) => {
		e.preventDefault()
		e.stopPropagation()

		openModal(
			<ConfirmWindow
				text='Вы действительно хотите удалить товар из корзины? Отменить это действие будет нельзя'
				submitHandle={() => {
					const removeItem = async () => {
						try {
							setUpdatingItemId(item.id_item)

							await deleteItemFromCart(
								createDeleteFormData(item.id_item) as unknown as FieldValues,
							).unwrap()
						} catch (error) {
							console.error('Ошибка при удалении товара из корзины:', error)
						} finally {
							setUpdatingItemId(null)
						}
					}

					void removeItem()
				}}
				link='/lk/cart'
			/>,
		)
	}

	const handleClearCart = () => {
		openModal(
			<ConfirmWindow
				text='Вы действительно хотите удалить все товары из корзины? Отменить это действие будет нельзя'
				submitHandle={() => {
					const clearItems = async () => {
						try {
							setIsClearing(true)
							await clearCart(createClearDeleteFormData()).unwrap()
						} catch (error) {
							console.error('Ошибка при очистке корзины:', error)
						} finally {
							setIsClearing(false)
						}
					}

					void clearItems()
				}}
				link='/lk/cart'
			/>,
		)
	}

	return (
		<FormProvider {...methods}>
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
										<div
											className={styles.deleteVectorMobile}
											onClick={async (e) => await handleRemoveFromCart(e, item)}
										>
											<DeleteItemFromCartSVG isMobile />
										</div>
										<Link
											to={`/catalog/${item.category_id}/item/${item.id_item}`}
											className={styles.linkRowCart}
										>
											<FlexRow className={styles.contentRow}>
												<img
													className={styles.img}
													src={item.img && item.img.length > 0 ? item.img[0].original : skeleton}
													alt=''
												/>

												<p className={styles.title}>{item.item_name}</p>
											</FlexRow>
										</Link>

										<FlexRow className={styles.infoRow}>
											<FlexRow className={styles.priceRow}>
												<p className={styles.price}>{formatPrice(item.item_price)}</p>
												<p>цена за 1 шт.</p>
											</FlexRow>

											<div
												className={cn(styles.smallBuyBtn, styles.mobileBuyBtn, {
													[styles.filled]: count > 0,
													[styles.loading]: isItemUpdating,
													[styles.disabled]: isItemUpdating || isFetching,
												})}
											>
												<FlexRow className={styles.counterCart}>
													<div
														className={styles.vector}
														onClick={async (e) => {
															if (isItemUpdating || isFetching) return

															await handleIncrease(e, item, '-1')
														}}
													>
														<MinusSVG color='#C09F3D' />
													</div>

													<div
														className={styles.counterInputWrapper}
														onMouseDown={(e) => {
															e.stopPropagation()
														}}
														onClick={(e) => {
															e.preventDefault()
															e.stopPropagation()
														}}
													>
														<ControlledInput
															name={getCounterName(item.id_item)}
															type='number'
															isCart
															className={styles.counterInput}
															margin='0'
															onBlur={() => {
																void handleCounterBlur(item)
															}}
															onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
																e.stopPropagation()

																if (e.key === 'Enter') {
																	e.preventDefault()
																	e.currentTarget.blur()
																}
															}}
															disabled={isItemUpdating || isFetching}
														/>
													</div>

													<div
														className={styles.vector}
														onClick={async (e) => {
															if (isItemUpdating || isFetching) return

															await handleIncrease(e, item, '1')
														}}
													>
														<PlusSVG color='#C09F3D' />
													</div>
												</FlexRow>
											</div>

											<p className={styles.totalPrice}>{formatPrice(item.item_fullprice)}</p>

											<div
												className={styles.deleteVector}
												onClick={async (e) => await handleRemoveFromCart(e, item)}
											>
												<DeleteItemFromCartSVG />
											</div>
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
		</FormProvider>
	)
}
