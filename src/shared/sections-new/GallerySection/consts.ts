import { DisplayBreakpoints } from 'src/shared/helpers/consts'
import { type SwiperProps } from 'swiper/react'

export const eventsSliderOptions: SwiperProps = {
	slidesPerView: 1.2,
	slidesPerGroup: 1,
	spaceBetween: 24,
	autoHeight: false,
	loop: false,
	breakpoints: {
		[DisplayBreakpoints.Sm]: {
			slidesPerView: 1.2,
		},
		[DisplayBreakpoints.Md]: {
			slidesPerView: 2.5,
		},
		[DisplayBreakpoints.Lg]: {
			slidesPerView: 2.5,
		},
		[DisplayBreakpoints.Xl]: {
			slidesPerView: 2.5,
		},
		[DisplayBreakpoints.Xxl]: {
			slidesPerView: 2.5,
		},
	},
}
