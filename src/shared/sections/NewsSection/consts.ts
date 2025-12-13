import { DisplayBreakpoints } from 'src/shared/helpers/consts'
import { type SwiperProps } from 'swiper/react/swiper-react'

export const newsSliderOptions: SwiperProps = {
	slidesPerView: 1.2,
	slidesPerGroup: 1,
	spaceBetween: 20,
	breakpoints: {
		[DisplayBreakpoints.Sm]: {
			slidesPerView: 1.2,
		},
		[DisplayBreakpoints.Md]: {
			slidesPerView: 2,
		},
		[DisplayBreakpoints.Lg]: {
			slidesPerView: 3,
		},
		[DisplayBreakpoints.Xl]: {
			slidesPerView: 4,
		},
		[DisplayBreakpoints.Xxl]: {
			slidesPerView: 4,
		},
	},
}
