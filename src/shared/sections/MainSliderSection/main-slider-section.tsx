import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { Section } from 'src/shared/ui/Section/section'
import { type RefObject, useRef } from 'react'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { SliderBtns } from 'src/widgets/Slider-btns/slider-btns'
import { sliderOptions } from './consts'

export const MainSliderSection = () => {
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const sliderInfo = [
		{
			id: '1',
			title: 'Набор авторских конфет ТАТЬЯНЫ БУЛАНОВОЙ',
			desc: 'Набор изготовлен по индивидуальному заказу и при непосредственном участии Татьяны Булановой — певицы, киноактрисы, заслуженной артистки России, двукратной обладательницы премии «Овация».В набор входят 6 уникальных конфет.',
			original: 'src/assets/img/slider-img.png',
		},
		{
			id: '2',
			title: 'Набор авторских конфет 2',
			desc: 'Набор изготовлен по индивидуальному заказу и при непосредственном участии Татьяны Булановой — певицы, киноактрисы, заслуженной артистки России, двукратной обладательницы премии «Овация».В набор входят 6 уникальных конфет.',
			original: 'src/assets/img/slider-img.png',
		},
	]
	return (
		<Section className={cn(styles.mainSlider)}>
			<Container className={styles.sliderCont}>
				<FlexRow className={styles.sectionRow}>
					<Swiper {...sliderOptions} ref={swiperRef} className={styles.sliderMain}>
						{sliderInfo.map((slideEl) => {
							return (
								<SwiperSlide key={slideEl.id}>
									<FlexRow className={styles.slideRow}>
										<FlexRow className={styles.contentSlide}>
											<p className={styles.slideTitle}>{slideEl.title}</p>
											<p className={styles.slideDesc}>{slideEl.desc}</p>
											<button className={styles.infoBtn}>Подробнее</button>
										</FlexRow>
										<div className={styles.imgWrapper}>
											{slideEl.original && (
												<img className={styles.sliderImg} src={slideEl.original} alt='image' />
											)}
										</div>
									</FlexRow>
								</SwiperSlide>
							)
						})}
					</Swiper>
					<SliderBtns className={styles.sliderBtns} swiperRef={swiperRef} />
				</FlexRow>
			</Container>
		</Section>
	)
}
