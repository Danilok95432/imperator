import { useEffect, useMemo, useState } from 'react'
import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Section } from 'src/shared/ui/Section/section'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import silver from 'src/assets/img/silver.png'
import gold from 'src/assets/img/gold.png'

import styles from './index.module.scss'
import { Pagination } from 'swiper'

const useMediaQuery = (query: string) => {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		if (typeof window === 'undefined') return
		const media = window.matchMedia(query)

		const update = () => setMatches(media.matches)
		update()

		// Safari fallback
		if ('addEventListener' in media) {
			media.addEventListener('change', update)
			return () => media.removeEventListener('change', update)
		}

		// @ts-expect-error legacy
		media.addListener(update)
		// @ts-expect-error legacy
		return () => media.removeListener(update)
	}, [query])

	return matches
}

export const AwardsSection = () => {
	const isSlider = useMediaQuery('(max-width: 768px)')

	const slides = useMemo(
		() => [
			{
				id: 'silver-2020',
				img: silver,
				alt: 'silver',
				infoClassName: styles.infoRowSilver,
				title: 'Серебряная медаль-2020',
				desc: (
					<>
						Темный шоколад без сахара, конфеты «<a href='#'>Медный всадник</a>», «
						<a href='#'>Алые паруса</a>», «<a href='#'>Русские</a>»
					</>
				),
				location: 'XXVII Международный конкурс «Лучший продукт-2020» г. Москва',
			},
			{
				id: 'gold-2021',
				img: gold,
				alt: 'gold',
				infoClassName: styles.infoRow,
				title: 'Золотая медаль-2021',
				desc: (
					<>
						Конфеты «<a href='#'>Зимний дворец</a>»,«<a href='#'> Москва</a>», «
						<a href='#'>Белый дом</a>»
					</>
				),
				location: 'Конкурс Союзэкспертизы «За высокие потребительские качества» г. Москва',
			},
			{
				id: 'gold-2022',
				img: gold,
				alt: 'gold',
				infoClassName: styles.infoRow,
				title: 'Золотая медаль-2022',
				desc: (
					<>
						Конфеты «<a href='#'>Красный цветок</a>», «<a href='#'>Лесной орех</a>»
					</>
				),
				location:
					'Почетным призом «За лучший инновационный продукт» награжден набор конфет ассорти «Точка с запятой»',
			},
		],
		[],
	)

	return (
		<Section className={styles.awards}>
			<Container>
				{isSlider ? (
					<Swiper
						className={styles.awardsRow}
						modules={[Pagination]}
						pagination={{ clickable: true }}
						slidesPerView={1}
						spaceBetween={16}
						speed={600}
					>
						{slides.map((s) => (
							<SwiperSlide key={s.id} className={styles.awardsSlide}>
								<FlexRow className={styles.awardsEl}>
									<img src={s.img} alt={s.alt} />
									<FlexRow className={s.infoClassName}>
										<p className={styles.title}>{s.title}</p>
										<p className={styles.desc}>{s.desc}</p>
										<p className={styles.location}>{s.location}</p>
									</FlexRow>
								</FlexRow>
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<FlexRow className={styles.awardsRow}>
						{slides.map((s) => (
							<FlexRow key={s.id} className={styles.awardsEl}>
								<img src={s.img} alt={s.alt} />
								<FlexRow className={s.infoClassName}>
									<p className={styles.title}>{s.title}</p>
									<p className={styles.desc}>{s.desc}</p>
									<p className={styles.location}>{s.location}</p>
								</FlexRow>
							</FlexRow>
						))}
					</FlexRow>
				)}
			</Container>
		</Section>
	)
}
