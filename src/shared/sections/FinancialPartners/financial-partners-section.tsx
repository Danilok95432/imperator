import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { type RefObject, useRef } from 'react'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { partnersSliderOptions } from './consts'
import { Autoplay } from 'swiper'

export const FinancialPartnersSection = () => {
	const { data: eventData } = useGetEventByIdQuery('1')
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	if (!eventData?.sponsors) return ''
	return (
		<Section className={cn(styles.generalPartners)}>
			<Container>
				<h2>Финансовые партнеры</h2>
				<div className={styles.partnerSlider}>
					<Swiper modules={[Autoplay]} {...partnersSliderOptions} ref={swiperRef}>
						{eventData?.sponsors.map((slideItem, idx) => (
							<SwiperSlide key={idx} className={styles.partnerSlide}>
								<div className={styles.partnerCard} key={slideItem.id}>
									{slideItem.link && slideItem.link !== '' ? (
										<a href={slideItem.link} className={styles.partnersLink}>
											<img
												src={slideItem.mainphoto?.[0]?.thumbnail}
												alt='partner'
												width={188}
												height={105}
												loading='lazy'
											/>
										</a>
									) : (
										<div className={styles.partnersLink}>
											<img
												src={slideItem.mainphoto?.[0]?.thumbnail}
												alt='partner'
												width={188}
												height={105}
												loading='lazy'
											/>
										</div>
									)}
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<SliderBtns className={styles.partnersSliderBtns} swiperRef={swiperRef} />
				</div>
			</Container>
		</Section>
	)
}
