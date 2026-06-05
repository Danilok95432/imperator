import { useEffect, useState, type MouseEvent } from 'react'
import { type FieldValues } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import cn from 'classnames'

import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { CardIconCatalogSVG } from 'src/shared/ui/icons/cardIconCatalogSVG'
import { HeartIconCatalogSVG } from 'src/shared/ui/icons/heartIconCatalogSVG'
import { MinusSVG } from 'src/shared/ui/icons/minusSvg'
import { PlusSVG } from 'src/shared/ui/icons/plusSVG'

import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import {
	useAddItemToCartMutation,
	useAddToFavoritesMutation,
	useDeleteFromFavoritesMutation,
} from 'src/features/catalog/api/catalog.api'

import { type CardItem } from 'src/types/cardItem'
import { AppRoute } from 'src/app/router/consts'

import skeleton from 'src/assets/img/candy(2).png'
import styles from './index.module.scss'
import { useActions } from 'src/app/store/hooks/actions'
import { ConfirmWindow } from 'src/modals/confirmActionModal/confirmActionModal'
import { toast } from 'react-toastify'

interface ChocolateCardProps {
	chocolate: CardItem
	className?: string
	smallCard?: boolean
}

type CartResponse = {
	item_count?: string
	status: string
	errortext?: string
}

export const ChocolateCard = ({ chocolate, className, smallCard }: ChocolateCardProps) => {
	const [filled, setFilled] = useState<boolean>(Boolean(chocolate.favourite))
	const [cartCount, setCartCount] = useState<number>(Number(chocolate.cart_count ?? 0))
	const [isHovered, setIsHovered] = useState<boolean>(false)
	const [isJumping, setIsJumping] = useState<boolean>(false)
	const [isCartUpdating, setIsCartUpdating] = useState<boolean>(false)
	const [isFavoriteUpdating, setIsFavoriteUpdating] = useState<boolean>(false)

	const breakPoint = useBreakPoint()
	const { menuId = '' } = useParams()

	const [addItemToCart] = useAddItemToCartMutation()
	const [addToFavorites] = useAddToFavoritesMutation()
	const [deleteFromFavorites] = useDeleteFromFavoritesMutation()

	useEffect(() => {
		setFilled(Boolean(chocolate.favourite))
	}, [chocolate.favourite])

	useEffect(() => {
		setCartCount(Number(chocolate.cart_count ?? 0))
	}, [chocolate.cart_count])

	const userID = localStorage.getItem('userID') ?? ''

	const createAddFormData = (count: string) => {
		const formData = new FormData()

		if (userID) {
			formData.append('id_user', userID)
		}

		formData.append('id_item', String(chocolate.id))
		formData.append('item_count', count)

		return formData
	}

	const createFavoriteFormData = () => {
		const formData = new FormData()

		if (userID) {
			formData.append('id_user', userID)
		}

		formData.append('id_item', String(chocolate.id))

		return formData
	}

	const startJumpAnimation = () => {
		setIsJumping(true)

		setTimeout(() => {
			setIsJumping(false)
		}, 400)
	}

	const { openModal } = useActions()

	const handleAddToCart = async (e: MouseEvent, countValue: string) => {
		e.preventDefault()
		e.stopPropagation()

		const delta = Number(countValue)

		if (isCartUpdating || (delta < 0 && cartCount <= 0)) return

		const updateCart = async () => {
			try {
				setIsCartUpdating(true)

				const response = (await addItemToCart(
					createAddFormData(countValue) as unknown as FieldValues,
				).unwrap()) as CartResponse

				if (response?.status === 'error') {
					console.error('Ошибка при изменении товара в корзине:', response.errortext)
					return
				}

				setCartCount((prev) => {
					const nextCount = Number(response?.item_count)

					if (Number.isFinite(nextCount)) {
						return Math.max(0, nextCount)
					}

					return Math.max(0, prev + delta)
				})

				if (delta > 0) {
					startJumpAnimation()
				}
			} catch (error) {
				console.error('Ошибка при изменении товара в корзине:', error)
			} finally {
				setIsCartUpdating(false)
			}
		}

		if (delta < 0 && cartCount === 1) {
			openModal(
				<ConfirmWindow
					text='Вы действительно хотите удалить товар из корзины? Отменить это действие будет нельзя'
					submitHandle={updateCart}
					link={`/catalog/${menuId}`}
				/>,
			)

			return
		}

		await updateCart()
	}

	const handleHeartClick = async (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		if (isFavoriteUpdating) return

		try {
			setIsFavoriteUpdating(true)

			if (filled) {
				const response = await deleteFromFavorites(
					createFavoriteFormData() as unknown as FieldValues,
				).unwrap()

				if (response?.status === 'error') {
					console.error('Ошибка при удалении из избранного:', response.errortext)
					return
				}

				setFilled(false)
			} else {
				if (!userID) {
					toast.error('Для добавления в избранное, пожалуйста, пройдите авторизацию на сайте.')
					return
				}
				const response = await addToFavorites(
					createFavoriteFormData() as unknown as FieldValues,
				).unwrap()

				if (response?.status === 'error') {
					console.error('Ошибка при добавлении в избранное:', response.errortext)
					return
				}

				setFilled(true)
			}
		} catch (error) {
			console.error('Ошибка при изменении избранного:', error)
		} finally {
			setIsFavoriteUpdating(false)
		}
	}

	const imageSrc = chocolate.img && chocolate.img.length > 0 ? chocolate.img[0].original : skeleton
	const linkTo = `${AppRoute.Catalog}/${chocolate.category_id ?? menuId}/item/${chocolate.id}`

	if (smallCard) {
		return (
			<Link to={linkTo}>
				<div className={cn(styles.smallCard, className)}>
					<FlexRow className={styles.smallIcon}>
						<div
							className={cn(styles.vector, {
								[styles.filledHeart]: filled,
								[styles.loading]: isFavoriteUpdating,
							})}
							onClick={handleHeartClick}
						>
							<HeartIconCatalogSVG filled={filled} />
						</div>
					</FlexRow>

					<div className={styles.smallImage}>
						<img src={imageSrc} alt={chocolate.title} />
					</div>

					<FlexRow className={styles.smallContent}>
						<FlexRow className={styles.smallInfoWrapper}>
							<h3 className={styles.title}>{`${chocolate.item_price} ₽`}</h3>
							<p className={styles.subtitle}>{chocolate.title}</p>
							{Number(chocolate.item_weight) > 0 && !chocolate.use_weight ? (
								<p className={styles.weight}>{`${chocolate.item_weight} гр.`}</p>
							) : (
								<p className={styles.weight}>{`весовой товар`}</p>
							)}
						</FlexRow>

						{breakPoint !== 'S' && (
							<MainButton
								type='button'
								className={cn(styles.smallBuyBtn, {
									[styles.filled]: cartCount > 0 && breakPoint === 'S',
									[styles.loading]: isCartUpdating,
								})}
								disabled={isCartUpdating}
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
								onClick={async (e: MouseEvent) => await handleAddToCart(e, '1')}
							>
								<CardIconCatalogSVG
									small
									filled={isHovered}
									className={isJumping ? styles.jump : ''}
								/>

								{cartCount > 0 && <div className={styles.counter}>{cartCount}</div>}
							</MainButton>
						)}

						{breakPoint === 'S' && (
							<MainButton
								type='button'
								className={cn(styles.smallBuyBtn, styles.mobileBuyBtn, {
									[styles.filled]: cartCount > 0,
									[styles.loading]: isCartUpdating,
								})}
								disabled={isCartUpdating}
								onClick={(e: MouseEvent) => {
									e.preventDefault()
									e.stopPropagation()
								}}
							>
								{cartCount === 0 ? (
									<p
										className={styles.btnText}
										onClick={async (e: MouseEvent) => await handleAddToCart(e, '1')}
									>
										В корзину
									</p>
								) : (
									<FlexRow className={styles.smallCounterCart}>
										<div
											className={styles.vector}
											onClick={async (e: MouseEvent) => await handleAddToCart(e, '-1')}
										>
											<MinusSVG />
										</div>

										<p>{cartCount}</p>

										<div
											className={styles.vector}
											onClick={async (e: MouseEvent) => await handleAddToCart(e, '1')}
										>
											<PlusSVG />
										</div>
									</FlexRow>
								)}
							</MainButton>
						)}
					</FlexRow>
				</div>
			</Link>
		)
	}

	return (
		<Link to={linkTo}>
			<div className={cn(styles.card, className)}>
				<FlexRow className={styles.icon}>
					<div
						className={cn(styles.vector, {
							[styles.filledHeart]: filled,
							[styles.loading]: isFavoriteUpdating,
						})}
						onClick={handleHeartClick}
					>
						<HeartIconCatalogSVG filled={filled} />
					</div>
				</FlexRow>

				<div className={styles.image}>
					<img src={imageSrc} alt={chocolate.title} />
				</div>

				<FlexRow className={styles.content}>
					<FlexRow className={styles.infoWrapper}>
						<h3 className={styles.title}>
							{chocolate.use_weight
								? `${chocolate.weight_price_kg} ₽/кг`
								: `${chocolate.item_price} ₽`}
						</h3>
						<p className={styles.subtitle}>{chocolate.title}</p>
						{Number(chocolate.item_weight) > 0 && !chocolate.use_weight ? (
							<p className={styles.weight}>{`${chocolate.item_weight} гр.`}</p>
						) : (
							<p className={styles.weight}>{`весовой товар`}</p>
						)}
					</FlexRow>

					{breakPoint !== 'S' && (
						<MainButton
							type='button'
							className={cn(styles.buyBtn, {
								[styles.filled]: cartCount > 0 && breakPoint === 'S',
								[styles.loading]: isCartUpdating,
							})}
							disabled={isCartUpdating}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
							onClick={async (e: MouseEvent) => await handleAddToCart(e, '1')}
						>
							<CardIconCatalogSVG filled={isHovered} className={isJumping ? styles.jump : ''} />

							{cartCount > 0 && <div className={styles.counter}>{cartCount}</div>}
						</MainButton>
					)}

					{breakPoint === 'S' && (
						<MainButton
							type='button'
							className={cn(styles.buyBtn, styles.mobileBuyBtn, {
								[styles.filled]: cartCount > 0,
								[styles.loading]: isCartUpdating,
							})}
							disabled={isCartUpdating}
							onClick={(e: MouseEvent) => {
								e.preventDefault()
								e.stopPropagation()
							}}
						>
							{cartCount === 0 ? (
								<p
									className={styles.btnText}
									onClick={async (e: MouseEvent) => await handleAddToCart(e, '1')}
								>
									В корзину
								</p>
							) : (
								<FlexRow className={styles.counterCart}>
									<div
										className={styles.vector}
										onClick={async (e: MouseEvent) => await handleAddToCart(e, '-1')}
									>
										<MinusSVG />
									</div>

									<p>{cartCount}</p>

									<div
										className={styles.vector}
										onClick={async (e: MouseEvent) => await handleAddToCart(e, '1')}
									>
										<PlusSVG />
									</div>
								</FlexRow>
							)}
						</MainButton>
					)}
				</FlexRow>
			</div>
		</Link>
	)
}
