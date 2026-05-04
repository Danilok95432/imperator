import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'

import styles from './index.module.scss'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additionalCrumbs'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { useState } from 'react'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'

import cn from 'classnames'
import { MinusSVG } from 'src/shared/ui/icons/minusSvg'
import { PlusSVG } from 'src/shared/ui/icons/plusSVG'
import skeleton from 'src/assets/img/candy(2).png'
import { useNavigate } from 'react-router-dom'
import { AppRoute } from 'src/app/router/consts'
import { useClearCartMutation } from 'src/features/catalog/api/catalog.api'

export const MyCartPage = () => {
	useAdditionalCrumbs('Моя корзина')
	const [count, setCount] = useState<number>(1)
	const [, setIsJumping] = useState<boolean>(false)
	const navigate = useNavigate()

	const [clearCart] = useClearCartMutation()

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

	const mockItems = [
		{
			id: '1',
			title: 'Шоколад',
			img: skeleton,
			amount: 2,
			price: 310,
		},
		{
			id: '2',
			title: 'Шоколад',
			img: skeleton,
			amount: 3,
			price: 330,
		},
	]

	return (
		<Section className={styles.section}>
			<Container className={styles.cont}>
				<h1 className={styles.title}>Моя корзина</h1>
				<FlexRow className={styles.clearRow}>
					<MainButton
						type='button'
						className={styles.clearBtn}
						onClick={async () => await clearCart(null)}
					>
						Очистить корзину
					</MainButton>
				</FlexRow>
				<FlexRow className={styles.cartRow}>
					{mockItems.map((el) => {
						return (
							<FlexRow className={styles.elementRow} key={el.id}>
								<FlexRow className={styles.contentRow}>
									<img className={styles.img} src={el.img} alt='' />
									<p className={styles.title}>{el.title}</p>
								</FlexRow>
								<FlexRow className={styles.infoRow}>
									<FlexRow className={styles.priceRow}>
										<p className={styles.price}>{el.price} ₽</p>
										<p>цена за 1 шт.</p>
									</FlexRow>
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
											<FlexRow className={styles.counterCart}>
												<div className={styles.vector} onClick={handleRemoveFromCart}>
													<MinusSVG color='#C09F3D' />
												</div>
												<p className={cn(styles.counter)}>{count}</p>
												<div className={styles.vector} onClick={handleIncrease}>
													<PlusSVG color='#C09F3D' />
												</div>
											</FlexRow>
										)}
									</MainButton>
									<p className={styles.totalPrice}>{el.amount * el.price} ₽</p>
								</FlexRow>
							</FlexRow>
						)
					})}
				</FlexRow>
				<FlexRow className={styles.resultRow}>
					<p>Итого:</p>
					<FlexRow className={styles.resultPriceRow}>
						<p>1 510.00 ₽</p>
						<p className={styles.price}>1 263.00 ₽</p>
					</FlexRow>
					<MainButton
						type='submit'
						className={styles.submitBtn}
						onClick={() => navigate(`/lk/${AppRoute.LKcart}`)}
					>
						Оформить заказ
					</MainButton>
				</FlexRow>
			</Container>
		</Section>
	)
}
