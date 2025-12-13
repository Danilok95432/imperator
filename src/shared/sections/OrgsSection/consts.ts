import { DisplayBreakpoints } from 'src/shared/helpers/consts'
import { type SwiperProps } from 'swiper/react/swiper-react'

export const partnersSliderOptions: SwiperProps = {
	slidesPerView: 1.3,
	slidesPerGroup: 1,
	spaceBetween: 32,
	autoHeight: false,
	loop: false,
	autoplay: {
		delay: 2000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
	breakpoints: {
		[DisplayBreakpoints.Xss]: {
			slidesPerView: 1.3,
		},
		[DisplayBreakpoints.Xs]: {
			slidesPerView: 2,
		},
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
			slidesPerView: 4,
		},
		[DisplayBreakpoints.Xll]: {
			slidesPerView: 4,
		},
		[DisplayBreakpoints.Xxl]: {
			slidesPerView: 4,
		},
	},
}
