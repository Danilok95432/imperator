import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { Section } from 'src/shared/ui/Section/section'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { type RefObject, useRef } from 'react'
import { eventsSliderOptions } from './consts'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import skeletonImg from 'src/assets/img/skeleton-img.png'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'

export const MainSliderSection = () => {
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const { data: eventData } = useGetEventByIdQuery('1')

	const sortedPromo = eventData?.promo
		? [...eventData.promo].sort((a, b) => Number(a.id) - Number(b.id))
		: []

	return (
		<Section className={cn(styles.mainSlider)}>
			<Container className={styles.sliderCont}>
				<Swiper {...eventsSliderOptions} ref={swiperRef} className={styles.sliderMain}>
					{sortedPromo.map((slideEl) => {
						return (
							<SwiperSlide key={slideEl.id}>
								<FlexRow className={styles.slideRow}>
									<FlexRow className={styles.contentSlide}>
										<p className={styles.slideTitle}>{slideEl.title}</p>
										<p className={styles.slideDesc}>{slideEl.desc}</p>
									</FlexRow>
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
				<div className={cn('custom-pagination', styles.paginationContainer)}></div>
				<SliderBtns className={styles.eventsSliderBtnsMobile} swiperRef={swiperRef} />
			</Container>
		</Section>
	)
}
