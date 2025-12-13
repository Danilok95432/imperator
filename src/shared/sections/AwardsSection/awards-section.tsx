import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { Section } from 'src/shared/ui/Section/section'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { type RefObject, useRef } from 'react'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { useGetEventAwardsByIdQuery } from 'src/features/home/api/home.api'
import { eventsSliderOptions } from './consts'

export const AwardsSection = () => {
	const { data: awards } = useGetEventAwardsByIdQuery('1')
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	return (
		<Section className={cn(styles.awards)}>
			<Container>
				<FlexRow className={styles.awardsList}>
					<Swiper {...eventsSliderOptions} ref={swiperRef}>
						{awards?.dates.map((el) => {
							return (
								<SwiperSlide key={el.id}>
									<div className={styles.awardEl}>
										<p>{el.datename}</p>
										<p>{el.datetext}</p>
									</div>
								</SwiperSlide>
							)
						})}
					</Swiper>
					<SliderBtns className={styles.eventsSliderBtns} swiperRef={swiperRef} />
				</FlexRow>
			</Container>
		</Section>
	)
}
