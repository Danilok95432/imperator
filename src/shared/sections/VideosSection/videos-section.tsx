import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { useGetEventVideosByIdQuery } from 'src/features/home/api/home.api'
import { type RefObject, useEffect, useRef, useState } from 'react'
import { VideoCard } from './components/video-card/video-card'
import { homeVideosSliderOptions } from './consts'

export const VideosSection = () => {
	const { data: videos } = useGetEventVideosByIdQuery('1')
	const [isMobile, setIsMobile] = useState(false)
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])
	return (
		<Section className={cn(styles.videos)}>
			<Container off={isMobile}>
				<div>
					<Swiper {...homeVideosSliderOptions} ref={swiperRef}>
						{videos?.map((slideItem, idx) => (
							<SwiperSlide key={idx}>
								<VideoCard key={slideItem.id} {...slideItem} />
							</SwiperSlide>
						))}
					</Swiper>
					<SliderBtns
						className={styles.videoSliderBtns}
						swiperRef={swiperRef}
						color={'#fff'}
						nextBtnColor='#000'
						prevBtnColor='#000'
					/>
				</div>
			</Container>
		</Section>
	)
}
