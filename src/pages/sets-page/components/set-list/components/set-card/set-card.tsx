import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import styles from './index.module.scss'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { CardIconCatalogSVG } from 'src/shared/ui/icons/cardIconCatalogSVG'
import { HeartIconCatalogSVG } from 'src/shared/ui/icons/heartIconCatalogSVG'
import { useState } from 'react'
import cn from 'classnames'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { MinusSVG } from 'src/shared/ui/icons/minusSvg'
import { PlusSVG } from 'src/shared/ui/icons/plusSVG'
import { type CardItem } from 'src/types/cardItem'
import { Link } from 'react-router-dom'
import { AppRoute } from 'src/app/router/consts'

interface SetCardProps {
	set: CardItem
	className?: string
	smallCard?: boolean
}

export const SetCard = ({ set, className, smallCard }: SetCardProps) => {
	const [filled, setFilled] = useState<boolean>(false)
	const [isHovered, setIsHovered] = useState<boolean>(false)
	const [count, setCount] = useState<number>(0)
	const [isJumping, setIsJumping] = useState<boolean>(false)
	const breakPoint = useBreakPoint()

	const handleAddToCart = () => {
		setCount((prev) => prev + 1)
		setIsJumping(true)
		setTimeout(() => {
			setIsJumping(false)
		}, 400)
	}

	const handleRemoveFromCart = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setCount((prev) => Math.max(0, prev - 1))
	}

	const handleIncrease = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setCount((prev) => prev + 1)
		setIsJumping(true)
		setTimeout(() => {
			setIsJumping(false)
		}, 400)
	}

	const handleFirstAdd = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		handleAddToCart()
	}
	if (smallCard) {
		return (
			<Link to={`${AppRoute.Sets}/${set.id}`}>
				<div className={cn(styles.smallCard, className)}>
					<FlexRow className={styles.smallIcon}>
						<div
							className={cn(styles.vector, { [styles.filledHeart]: filled })}
							onClick={(e: React.MouseEvent) => {
								setFilled(!filled)
								e.preventDefault()
								e.stopPropagation()
							}}
						>
							<HeartIconCatalogSVG filled={filled} />
						</div>
					</FlexRow>
					<div className={styles.smallImage}>
						<img src={set.img && set.img.length > 0 ? set.img[0].original : ''} alt={set.title} />
					</div>

					<FlexRow className={styles.smallContent}>
						<FlexRow className={styles.smallInfoWrapper}>
							<h3 className={styles.title}>{`${set.item_price} ₽`}</h3>
							<p className={styles.subtitle}>{set.title}</p>
							<p className={styles.weight}>{`${set.item_weight} г`}</p>
						</FlexRow>

						{breakPoint !== 'S' && (
							<MainButton
								className={cn(styles.smallBuyBtn, {
									[styles.filled]: count > 0 && breakPoint === 'S',
								})}
								onMouseEnter={() => setIsHovered(true)}
								onMouseLeave={() => setIsHovered(false)}
								onClick={(e: React.MouseEvent) => {
									e.preventDefault()
									e.stopPropagation()
									handleAddToCart()
								}}
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
								className={cn(styles.smallBuyBtn, styles.mobileBuyBtn, {
									[styles.filled]: count > 0,
								})}
							>
								{count === 0 ? (
									<p className={styles.btnText} onClick={handleFirstAdd}>
										В корзину
									</p>
								) : (
									<FlexRow className={styles.smallCounterCart}>
										<div className={styles.vector} onClick={handleRemoveFromCart}>
											<MinusSVG />
										</div>
										<p>{count}</p>
										<div className={styles.vector} onClick={handleIncrease}>
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
		<Link to={`${AppRoute.Sets}/${set.id}`}>
			<div className={cn(styles.card, className)}>
				<FlexRow className={styles.icon}>
					<div
						className={cn(styles.vector, { [styles.filledHeart]: filled })}
						onClick={(e: React.MouseEvent) => {
							setFilled(!filled)
							e.preventDefault()
							e.stopPropagation()
						}}
					>
						<HeartIconCatalogSVG filled={filled} />
					</div>
				</FlexRow>
				<div className={styles.image}>
					<img src={set.img && set.img.length > 0 ? set.img[0].original : ''} alt={set.title} />
				</div>

				<FlexRow className={styles.content}>
					<FlexRow className={styles.infoWrapper}>
						<h3 className={styles.title}>{`${set.item_price} ₽`}</h3>
						<p className={styles.subtitle}>{set.title}</p>
						<p className={styles.weight}>{`${set.item_weight} г`}</p>
					</FlexRow>

					{breakPoint !== 'S' && (
						<MainButton
							className={cn(styles.buyBtn, { [styles.filled]: count > 0 && breakPoint === 'S' })}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
							onClick={(e: React.MouseEvent) => {
								e.preventDefault()
								e.stopPropagation()
								handleAddToCart()
							}}
						>
							<CardIconCatalogSVG filled={isHovered} className={isJumping ? styles.jump : ''} />
							{count > 0 && <div className={styles.counter}>{count}</div>}
						</MainButton>
					)}

					{breakPoint === 'S' && (
						<MainButton
							className={cn(styles.buyBtn, styles.mobileBuyBtn, { [styles.filled]: count > 0 })}
						>
							{count === 0 ? (
								<p className={styles.btnText} onClick={handleFirstAdd}>
									В корзину
								</p>
							) : (
								<FlexRow className={styles.counterCart}>
									<div className={styles.vector} onClick={handleRemoveFromCart}>
										<MinusSVG />
									</div>
									<p>{count}</p>
									<div className={styles.vector} onClick={handleIncrease}>
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
