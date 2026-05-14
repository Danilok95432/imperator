import { useState } from 'react'
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
	// useDeleteItemFromCartMutation,
	useAddToFavoritesMutation,
	useDeleteFromFavoritesMutation,
} from 'src/features/catalog/api/catalog.api'

import { type CardItem } from 'src/types/cardItem'
import { AppRoute } from 'src/app/router/consts'

import skeleton from 'src/assets/img/candy(2).png'
import styles from './index.module.scss'

interface ChocolateCardProps {
	chocolate: CardItem
	className?: string
	smallCard?: boolean
}

export const ChocolateCard = ({ chocolate, className, smallCard }: ChocolateCardProps) => {
	const [filled, setFilled] = useState<boolean>(false)
	const [isHovered, setIsHovered] = useState<boolean>(false)
	const [count, setCount] = useState<number>(0)
	const [isJumping, setIsJumping] = useState<boolean>(false)
	const [isCartUpdating, setIsCartUpdating] = useState<boolean>(false)
	const [isFavoriteUpdating, setIsFavoriteUpdating] = useState<boolean>(false)

	const breakPoint = useBreakPoint()
	const { menuId = '' } = useParams()

	const [addItemToCart] = useAddItemToCartMutation()
	// const [deleteItemFromCart] = useDeleteItemFromCartMutation()

	const [addToFavorites] = useAddToFavoritesMutation()
	const [deleteFromFavorites] = useDeleteFromFavoritesMutation()

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

	// const createDeleteFormData = () => {
	// 	const formData = new FormData()

	// 	if (userID) {
	// 		formData.append('id_user', userID)
	// 	}

	// 	formData.append('id_item', String(chocolate.id))

	// 	return formData
	// }

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

	const handleAddToCart = async (e: React.MouseEvent, count: string) => {
		e.preventDefault()
		e.stopPropagation()

		if (isCartUpdating) return

		try {
			setIsCartUpdating(true)

			await addItemToCart(createAddFormData(count) as unknown as FieldValues).unwrap()

			setCount((prev) => prev + 1)
			startJumpAnimation()
		} catch (error) {
			console.error('Ошибка при добавлении товара в корзину:', error)
		} finally {
			setIsCartUpdating(false)
		}
	}

	// const handleRemoveFromCart = async (e: React.MouseEvent, countRemove: string) => {
	// 	e.preventDefault()
	// 	e.stopPropagation()

	// 	if (isCartUpdating || count <= 0) return

	// 	try {
	// 		setIsCartUpdating(true)

	// 		await addItemToCart(createAddFormData(countRemove) as unknown as FieldValues).unwrap()

	// 		setCount((prev) => Math.max(0, prev - 1))
	// 	} catch (error) {
	// 		console.error('Ошибка при удалении товара из корзины:', error)
	// 	} finally {
	// 		setIsCartUpdating(false)
	// 	}
	// }

	const handleHeartClick = async (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		if (isFavoriteUpdating) return

		try {
			setIsFavoriteUpdating(true)

			if (filled) {
				await deleteFromFavorites(createFavoriteFormData() as unknown as FieldValues).unwrap()
				setFilled(false)
			} else {
				await addToFavorites(createFavoriteFormData() as unknown as FieldValues).unwrap()
				setFilled(true)
			}
		} catch (error) {
			console.error('Ошибка при изменении избранного:', error)
		} finally {
			setIsFavoriteUpdating(false)
		}
	}

	const imageSrc = chocolate.img && chocolate.img.length > 0 ? chocolate.img[0].original : skeleton
	const linkTo = `${AppRoute.Catalog}/${menuId}/item/${chocolate.id}`

	if (smallCard) {
		return (
			<Link to={linkTo}>
				<div className={cn(styles.smallCard, className)}>
					<FlexRow className={styles.smallIcon}>
						<div
							className={cn(styles.vector, {
								[styles.filledHeart]: chocolate.favourite,
								[styles.loading]: isFavoriteUpdating,
							})}
							onClick={handleHeartClick}
						>
							<HeartIconCatalogSVG filled={chocolate.favourite} />
						</div>
					</FlexRow>

					<div className={styles.smallImage}>
						<img src={imageSrc} alt={chocolate.title} />
					</div>

					<FlexRow className={styles.smallContent}>
						<FlexRow className={styles.smallInfoWrapper}>
							<h3 className={styles.title}>{`${chocolate.item_price} ₽`}</h3>
							<p className={styles.subtitle}>{chocolate.title}</p>
							<p className={styles.weight}>{`${chocolate.item_weight} г`}</p>
						</FlexRow>

						{breakPoint !== 'S' && (
							<MainButton
								type='button'
								className={cn(styles.smallBuyBtn, {
									[styles.filled]: count > 0 && breakPoint === 'S',
									[styles.loading]: isCartUpdating,
								})}
								disabled={isCartUpdating}
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
								onClick={async (e: React.MouseEvent) => await handleAddToCart(e, '1')}
							>
								<CardIconCatalogSVG
									small
									filled={isHovered}
									className={isJumping ? styles.jump : ''}
								/>

								{count > 0 && <div className={styles.counter}>{count}</div>}
							</MainButton>
						)}

						{breakPoint === 'S' && (
							<MainButton
								type='button'
								className={cn(styles.smallBuyBtn, styles.mobileBuyBtn, {
									[styles.filled]: count > 0,
									[styles.loading]: isCartUpdating,
								})}
								disabled={isCartUpdating}
								onClick={(e: React.MouseEvent) => {
									e.preventDefault()
									e.stopPropagation()
								}}
							>
								{count === 0 ? (
									<p
										className={styles.btnText}
										onClick={async (e: React.MouseEvent) => await handleAddToCart(e, '1')}
									>
										В корзину
									</p>
								) : (
									<FlexRow className={styles.smallCounterCart}>
										<div
											className={styles.vector}
											onClick={async (e: React.MouseEvent) => await handleAddToCart(e, '-1')}
										>
											<MinusSVG />
										</div>

										<p>{count}</p>

										<div
											className={styles.vector}
											onClick={async (e: React.MouseEvent) => await handleAddToCart(e, '1')}
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
							[styles.filledHeart]: chocolate.favourite,
							[styles.loading]: isFavoriteUpdating,
						})}
						onClick={handleHeartClick}
					>
						<HeartIconCatalogSVG filled={chocolate.favourite} />
					</div>
				</FlexRow>

				<div className={styles.image}>
					<img src={imageSrc} alt={chocolate.title} />
				</div>

				<FlexRow className={styles.content}>
					<FlexRow className={styles.infoWrapper}>
						<h3 className={styles.title}>{`${chocolate.item_price} ₽`}</h3>
						<p className={styles.subtitle}>{chocolate.title}</p>
						<p className={styles.weight}>{`${chocolate.item_weight} г`}</p>
					</FlexRow>

					{breakPoint !== 'S' && (
						<MainButton
							type='button'
							className={cn(styles.buyBtn, {
								[styles.filled]: count > 0 && breakPoint === 'S',
								[styles.loading]: isCartUpdating,
							})}
							disabled={isCartUpdating}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
							onClick={async (e: React.MouseEvent) => await handleAddToCart(e, '1')}
						>
							<CardIconCatalogSVG filled={isHovered} className={isJumping ? styles.jump : ''} />

							{count > 0 && <div className={styles.counter}>{count}</div>}
						</MainButton>
					)}

					{breakPoint === 'S' && (
						<MainButton
							type='button'
							className={cn(styles.buyBtn, styles.mobileBuyBtn, {
								[styles.filled]: count > 0,
								[styles.loading]: isCartUpdating,
							})}
							disabled={isCartUpdating}
							onClick={(e: React.MouseEvent) => {
								e.preventDefault()
								e.stopPropagation()
							}}
						>
							{count === 0 ? (
								<p
									className={styles.btnText}
									onClick={async (e: React.MouseEvent) => await handleAddToCart(e, '1')}
								>
									В корзину
								</p>
							) : (
								<FlexRow className={styles.counterCart}>
									<div
										className={styles.vector}
										onClick={async (e: React.MouseEvent) => await handleAddToCart(e, '-1')}
									>
										<MinusSVG />
									</div>

									<p>{count}</p>

									<div
										className={styles.vector}
										onClick={async (e: React.MouseEvent) => await handleAddToCart(e, '1')}
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
