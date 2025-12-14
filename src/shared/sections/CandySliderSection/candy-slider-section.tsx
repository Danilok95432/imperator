import { type FC, type RefObject, useMemo, useRef } from 'react'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'

import 'swiper/css'

import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Section } from 'src/shared/ui/Section/section'
import { SliderBtns } from 'src/widgets/Slider-btns/slider-btns'
import { sliderOptions } from './consts'
import { HeartIconSVG } from 'src/shared/ui/icons/heartIconSVG'

type CandyItem = {
	id: string
	title: string
	weight: string
	price: number
	imageSrc: string
}

type CandySliderSectionProps = {
	title?: string
	items?: CandyItem[]
}

export const CandySliderSection: FC<CandySliderSectionProps> = ({
	title = 'Наше лучшее',
	items,
}) => {
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const data = useMemo<CandyItem[]>(
		() =>
			items ?? [
				{
					id: '1',
					title: 'Конфеты «БОЛЬШОЙ ГОРОД»',
					weight: '300 г',
					price: 1300,
					imageSrc: 'src/assets/img/candy(1).png',
				},
				{
					id: '2',
					title: 'Конфеты «Гвардейские»',
					weight: '300 г',
					price: 1300,
					imageSrc: 'src/assets/img/candy(2).png',
				},
				{
					id: '3',
					title: 'Конфеты «1147»',
					weight: '300 г',
					price: 1300,
					imageSrc: 'src/assets/img/candy(3).png',
				},
				{
					id: '4',
					title: 'Конфеты «Любовь Орлова»',
					weight: '300 г',
					price: 1300,
					imageSrc: 'src/assets/img/candy(4).png',
				},
				{
					id: '5',
					title: 'Конфеты «БОЛЬШОЙ ГОРОД»',
					weight: '300 г',
					price: 1300,
					imageSrc: 'src/assets/img/candy(1).png',
				},
				{
					id: '6',
					title: 'Конфеты «Гвардейские»',
					weight: '300 г',
					price: 1300,
					imageSrc: 'src/assets/img/candy(2).png',
				},
				{
					id: '7',
					title: 'Конфеты «1147»',
					weight: '300 г',
					price: 1300,
					imageSrc: 'src/assets/img/candy(3).png',
				},
				{
					id: '8',
					title: 'Конфеты «Любовь Орлова»',
					weight: '300 г',
					price: 1300,
					imageSrc: 'src/assets/img/candy(4).png',
				},
			],
		[items],
	)

	const formatPrice = (value: number) =>
		`${value.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽`

	return (
		<Section className={styles.candySliderSection}>
			<Container>
				<FlexRow className={styles.headRow}>
					<h2 className={styles.title}>{title}</h2>
				</FlexRow>

				<div className={styles.sliderWrap}>
					<Swiper {...sliderOptions} className={styles.swiper} ref={swiperRef}>
						{data.map((item) => (
							<SwiperSlide key={item.id} className={styles.slide}>
								<FlexRow className={styles.card}>
									<FlexRow className={styles.heartRow}>
										<HeartIconSVG className={styles.heart} />
									</FlexRow>
									<div className={styles.imageWrap}>
										<img
											className={styles.image}
											src={item.imageSrc}
											alt={item.title}
											loading='lazy'
										/>
									</div>
									<div className={styles.name}>{item.title}</div>
									<FlexRow className={styles.metaRow}>
										<span className={styles.weight}>{item.weight}</span>
										<span className={styles.price}>{formatPrice(item.price)}</span>
									</FlexRow>
								</FlexRow>
							</SwiperSlide>
						))}
					</Swiper>
					<SliderBtns className={styles.sliderBtns} swiperRef={swiperRef} />
				</div>
			</Container>
		</Section>
	)
}
