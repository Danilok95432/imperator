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

interface Chocolate {
	id: number
	price: number
	title: string
	weight: number
	category: string
	additives?: string[]
	img: string
}

interface ChocolateCardProps {
	chocolate: Chocolate
}

export const ChocolateCard = ({ chocolate }: ChocolateCardProps) => {
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
		e.stopPropagation()
		setCount((prev) => Math.max(0, prev - 1))
	}

	const handleIncrease = (e: React.MouseEvent) => {
		e.stopPropagation()
		setCount((prev) => prev + 1)
		setIsJumping(true)
		setTimeout(() => {
			setIsJumping(false)
		}, 400)
	}

	const handleFirstAdd = (e: React.MouseEvent) => {
		e.stopPropagation()
		handleAddToCart()
	}

	return (
		<div className={styles.card}>
			<FlexRow className={styles.icon}>
				<div
					className={cn(styles.vector, { [styles.filledHeart]: filled })}
					onClick={() => setFilled(!filled)}
				>
					<HeartIconCatalogSVG filled={filled} />
				</div>
			</FlexRow>
			<div className={styles.image}>
				<img src={chocolate.img} alt={chocolate.title} />
			</div>

			<FlexRow className={styles.content}>
				<FlexRow className={styles.infoWrapper}>
					<h3 className={styles.title}>{`${chocolate.price}.00 ₽`}</h3>
					<p className={styles.subtitle}>{chocolate.title}</p>
					<p className={styles.weight}>{`${chocolate.weight} г`}</p>
				</FlexRow>

				{breakPoint !== 'S' && (
					<MainButton
						className={cn(styles.buyBtn, { [styles.filled]: count > 0 && breakPoint === 'S' })}
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						onClick={handleAddToCart}
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
	)
}
