import { DisplayBreakpoints } from 'src/shared/helpers/consts'
import { type SwiperProps } from 'swiper/react/swiper-react'

export const eventsSliderOptions: SwiperProps = {
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 18,
	autoHeight: false,
	breakpoints: {
		[DisplayBreakpoints.Sm]: {
			slidesPerView: 2,
		},
		[DisplayBreakpoints.Md]: {
			slidesPerView: 3,
		},
		[DisplayBreakpoints.ShortLg]: {
			slidesPerView: 4,
		},
		[DisplayBreakpoints.Lg]: {
			slidesPerView: 5,
		},
		[DisplayBreakpoints.Xll]: {
			slidesPerView: 6,
		},
		[DisplayBreakpoints.Xxl]: {
			slidesPerView: 7,
		},
	},
}
