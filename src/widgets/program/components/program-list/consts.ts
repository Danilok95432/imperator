import { DisplayBreakpoints } from 'src/shared/helpers/consts'
import { type SwiperProps } from 'swiper/react/swiper-react'

export const homeVideosSliderOptions: SwiperProps = {
	// slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 25,
	grabCursor: true,
	breakpoints: {
		[DisplayBreakpoints.Sm]: {
			slidesPerView: 1,
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
			slidesPerView: 5,
		},
	},
}
