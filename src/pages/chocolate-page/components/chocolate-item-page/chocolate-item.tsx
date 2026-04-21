import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Section } from 'src/shared/ui/Section/section'

import styles from './index.module.scss'
import { BreadCrumbs } from 'src/widgets/breadcrumbs/bread-crumbs'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additionalCrumbs'
import { useParams } from 'react-router-dom'
import { type CardItem } from 'src/types/cardItem'
import { ChocolateCard } from '../chocolate-list/components/chocolate-card/chocolate-card'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { type RefObject, useEffect, useRef, useState } from 'react'
import { MinusSVG } from 'src/shared/ui/icons/minusSvg'
import { PlusSVG } from 'src/shared/ui/icons/plusSVG'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'

import cn from 'classnames'
import { SliderBtns } from 'src/widgets/Slider-btns/slider-btns'
import { sliderOptions } from './consts'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { useGetItemCatalogByIDQuery } from 'src/features/catalog/api/catalog.api'

export const ChocolateItem = () => {
	const { id = '' } = useParams()
	const { data } = useGetItemCatalogByIDQuery(id)
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const chocolate = data
	const [alsoItems, setAlsoItems] = useState<CardItem[]>([])
	const getRandomItems = (arr: CardItem[], count: number) => {
		const shuffled = [...arr]
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
		}
		return shuffled.slice(0, count)
	}

	useEffect(() => {
		setAlsoItems(getRandomItems(data?.moreitems ?? [], 4))
	}, [id])

	useAdditionalCrumbs(chocolate?.title)

	const [count, setCount] = useState<number>(0)
	const [, setIsJumping] = useState<boolean>(false)

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

	return (
		<Section className={styles.chocolatePage}>
			<Container className={styles.cont}>
				<FlexRow className={styles.headRow}>
					<BreadCrumbs
						crumbsLinksMap={[
							{
								title: 'Шоколад',
								link: 'chocolate',
							},
						]}
					/>
				</FlexRow>
				<FlexRow className={styles.previewProduct}>
					<FlexRow className={styles.slider}>
						<Swiper
							{...sliderOptions}
							ref={swiperRef}
							className={styles.sliderMain}
							modules={[Pagination]}
							pagination={{ clickable: true }}
						>
							{chocolate?.images.map((slideEl, idx) => {
								return (
									<SwiperSlide key={idx}>
										<FlexRow className={styles.slideRow}>
											<div className={styles.imgWrapper}>
												{slideEl && (
													<img
														className={styles.sliderImg}
														src={slideEl ? slideEl.original : ''}
														alt='image'
													/>
												)}
											</div>
										</FlexRow>
									</SwiperSlide>
								)
							})}
						</Swiper>
						<SliderBtns className={styles.sliderBtns} swiperRef={swiperRef} />
					</FlexRow>
					<FlexRow className={styles.infoWrapper}>
						<FlexRow className={styles.info}>
							<p className={styles.title}>{chocolate?.title}</p>
							<p className={styles.weight}>{`${chocolate?.item_weight} г`}</p>
							<p className={styles.desc}>{chocolate?.short}</p>
							<p className={styles.composition}>{`Состав: ${chocolate?.item_desc}`}</p>
						</FlexRow>
						<FlexRow className={styles.buySection}>
							<p className={styles.price}>{`${chocolate?.item_price} ₽`}</p>
							<MainButton
								className={cn(styles.buyButton, {
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
											<MinusSVG />
										</div>
										<p>{count}</p>
										<div className={styles.vector} onClick={handleIncrease}>
											<PlusSVG />
										</div>
									</FlexRow>
								)}
							</MainButton>
						</FlexRow>
					</FlexRow>
				</FlexRow>
				<FlexRow className={styles.alsoItems}>
					<p className={styles.subtitle}>Попробуйте также</p>
					<div className={styles.alsoList}>
						{alsoItems &&
							alsoItems.length > 0 &&
							alsoItems.map((el) => {
								return (
									<ChocolateCard key={el.id} chocolate={el} className={styles.alsoCard} smallCard />
								)
							})}
					</div>
				</FlexRow>
			</Container>
		</Section>
	)
}
