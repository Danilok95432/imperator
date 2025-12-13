import { DisplayBreakpoints } from 'src/shared/helpers/consts'
import { type SwiperProps } from 'swiper/react/swiper-react'

export const partnersSliderOptions: SwiperProps = {
	slidesPerView: 2,
	slidesPerGroup: 1,
	spaceBetween: 17,
	autoHeight: false,
	loop: true,
	autoplay: {
		delay: 2000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
	breakpoints: {
		[DisplayBreakpoints.Xss]: {
			slidesPerView: 1,
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
			slidesPerView: 5,
		},
		[DisplayBreakpoints.Xll]: {
			slidesPerView: 6,
		},
		[DisplayBreakpoints.Xxl]: {
			slidesPerView: 6,
		},
	},
}
