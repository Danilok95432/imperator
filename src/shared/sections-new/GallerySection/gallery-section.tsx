import { type RefObject, useRef, useState } from 'react'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { eventsSliderOptions } from './consts'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import skeletonImg from 'src/assets/img/skeleton-img.png'

import styles from './index.module.scss'
import type { Swiper as SwiperType } from 'swiper'

export const GallerySection = () => {
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const { data: eventData } = useGetEventByIdQuery('1')

	const [activeIndex, setActiveIndex] = useState(0)

	const handleSlideChange = (swiper: SwiperType) => {
		setActiveIndex(swiper.activeIndex)
	}

	const getButtonColors = () => {
		const isFirstSlide = activeIndex === 0
		const isLastSlide = eventData?.promo ? activeIndex === eventData.promo.length - 2 : false

		return {
			prevBtnColor: isFirstSlide ? '#00000040' : '#000',
			nextBtnColor: isLastSlide ? '#00000040' : '#000',
		}
	}

	const { prevBtnColor, nextBtnColor } = getButtonColors()

	return (
		<Section className={styles.gallerySection}>
			<Container className={styles.galleryCont}>
				<Swiper
					{...eventsSliderOptions}
					ref={swiperRef}
					className={styles.sliderMain}
					onSlideChange={handleSlideChange}
					onInit={(swiper) => setActiveIndex(swiper.activeIndex)}
				>
					{eventData?.promo.map((slideEl) => {
						return (
							<SwiperSlide key={slideEl.id}>
								<FlexRow className={styles.slideRow}>
									<div className={styles.imgWrapper}>
										{slideEl.original ? (
											<img className={styles.sliderImg} src={slideEl.original} alt='image' />
										) : (
											<img className={styles.skeletonImg} src={skeletonImg} alt='image' />
										)}
									</div>
								</FlexRow>
							</SwiperSlide>
						)
					})}
				</Swiper>
				<SliderBtns
					className={styles.sliderBtns}
					swiperRef={swiperRef}
					color={'#fff'}
					prevBtnColor={prevBtnColor}
					nextBtnColor={nextBtnColor}
				/>
			</Container>
		</Section>
	)
}
