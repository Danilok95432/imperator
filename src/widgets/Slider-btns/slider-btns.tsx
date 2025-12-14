import React, { type FC, type RefObject } from 'react'
import { type SwiperRef } from 'swiper/react'
import styles from './index.module.scss'

import cn from 'classnames'
import { SlidePrevSVG } from 'src/shared/ui/icons/slidePrevSVG'
import { SlideNextSVG } from 'src/shared/ui/icons/slideNextSVG'

type SliderProps = {
	swiperRef: RefObject<SwiperRef>
	className?: string
	prevBtnColor?: string
	nextBtnColor?: string
	color?: string
}

export const SliderBtns: FC<SliderProps> = ({ swiperRef, className }) => {
	const handlePrev = () => {
		swiperRef.current?.swiper.slidePrev()
	}

	const handleNext = () => {
		swiperRef.current?.swiper.slideNext()
	}
	return (
		<div className={cn(className, styles.sliderBtnsWrapper)}>
			<button type='button' onClick={handlePrev}>
				<SlidePrevSVG />
			</button>
			<button type='button' onClick={handleNext}>
				<SlideNextSVG />
			</button>
		</div>
	)
}
