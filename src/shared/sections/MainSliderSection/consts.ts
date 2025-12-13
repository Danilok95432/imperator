import { Pagination } from 'swiper'
import { type SwiperProps } from 'swiper/react'

export const eventsSliderOptions: SwiperProps = {
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 0,
	autoHeight: false,
	loop: true,
	pagination: {
		clickable: true,
		dynamicBullets: false,
		el: '.custom-pagination',
		type: 'bullets',
		bulletClass: 'swiper-pagination-bullet',
		bulletActiveClass: 'swiper-pagination-bullet-active',
	},
	modules: [Pagination],
}
