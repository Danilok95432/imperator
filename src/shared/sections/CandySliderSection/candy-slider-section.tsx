import { type FC, type RefObject, useRef } from 'react'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'

import 'swiper/css'

import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Section } from 'src/shared/ui/Section/section'
import { SliderBtns } from 'src/widgets/Slider-btns/slider-btns'
import { sliderOptions } from './consts'
import { HeartIconSVG } from 'src/shared/ui/icons/heartIconSVG'
import { useGetBestListQuery } from 'src/features/home/api/home.api'

import skeleton from 'src/assets/img/candy(2).png'
import { userID } from 'src/shared/helpers/consts'

type CandySliderSectionProps = {
	title?: string
}

export const CandySliderSection: FC<CandySliderSectionProps> = ({ title = 'Наше лучшее' }) => {
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const { data } = useGetBestListQuery(userID ?? '')

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
						{data?.best.map((item) => (
							<SwiperSlide key={item.id} className={styles.slide}>
								<FlexRow className={styles.card}>
									<FlexRow className={styles.heartRow}>
										<HeartIconSVG className={styles.heart} />
									</FlexRow>
									<div className={styles.imageWrap}>
										<img
											className={styles.image}
											src={item.img[0]?.original ?? skeleton}
											alt={item.title}
											loading='lazy'
										/>
									</div>
									<div className={styles.name}>{item.title}</div>
									<FlexRow className={styles.metaRow}>
										<span className={styles.weight}>{item.item_weight} г.</span>
										<span className={styles.price}>{formatPrice(Number(item.item_price))}</span>
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
