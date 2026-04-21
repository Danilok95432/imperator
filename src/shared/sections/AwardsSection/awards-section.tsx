import { useEffect, useState } from 'react'
import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Section } from 'src/shared/ui/Section/section'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

import styles from './index.module.scss'
import { useGetAwardsListQuery } from 'src/features/home/api/home.api'

import silver from 'src/assets/img/silver.png'
import gold from 'src/assets/img/gold.png'

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
	const { data } = useGetAwardsListQuery(null)

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
						{data?.awards.map((s) => (
							<SwiperSlide key={s.id} className={styles.awardsSlide}>
								<FlexRow className={styles.awardsEl}>
									<img src={s.color === 'Серебро' ? silver : gold} alt={''} />
									<FlexRow
										className={
											s.title.includes('Серебряная') ? styles.infoRowSilver : styles.infoRow
										}
									>
										<p className={styles.title}>{s.title}</p>
										{s.itemname && (
											<p className={styles.desc} dangerouslySetInnerHTML={{ __html: s.itemname }} />
										)}

										<p className={styles.location}>{s.itemdesc}</p>
									</FlexRow>
								</FlexRow>
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<FlexRow className={styles.awardsRow}>
						{data?.awards.map((s) => (
							<FlexRow key={s.id} className={styles.awardsEl}>
								<img src={s.color === 'Серебро' ? silver : gold} alt={''} />
								<FlexRow
									className={s.title.includes('Серебряная') ? styles.infoRowSilver : styles.infoRow}
								>
									<p className={styles.title}>{s.title}</p>
									{s.itemname && (
										<p className={styles.desc} dangerouslySetInnerHTML={{ __html: s.itemname }} />
									)}
									<p className={styles.location}>{s.itemdesc}</p>
								</FlexRow>
							</FlexRow>
						))}
					</FlexRow>
				)}
			</Container>
		</Section>
	)
}
