import { type RefObject, useRef, type FC } from 'react'
import { type ProgramListItem } from 'src/types/program'

import skeleton from 'src/assets/img/skeleton-img.png'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
// import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { homeVideosSliderOptions } from './consts'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'

type ProgramListProps = {
	list: ProgramListItem[]
	viewMode: string
}

export const ProgramList: FC<ProgramListProps> = ({ list, viewMode = 'list' }) => {
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const breakPoint = useBreakPoint()
	if (!list?.length) return null
	return (
		<>
			{viewMode === 'list' ? (
				<ul className={styles.listProgram}>
					{list.map((programEL) => (
						<li key={programEL.id}>
							<p className={styles.programTime}>{programEL.time}</p>
							<span className={styles.programPlace}>{programEL.place}</span>
							<Link to={`https://этноспорт.рф/events/1/event-program/${programEL.id}`}>
								<span className={styles.programTitle}>{programEL.title}</span>
							</Link>
							{/* {programEL.use_reg === 1 && (
												<MainButton as='route' to={'#'} className={styles.requestBtn}>
													Подать заявку
												</MainButton>
											)}
												*/}
						</li>
					))}
				</ul>
			) : breakPoint === 'S' ? (
				<>
					<Swiper {...homeVideosSliderOptions} ref={swiperRef}>
						<div className={styles.listTabs}>
							{list.map((programEL, idx) => (
								<SwiperSlide key={idx} className={styles.listTabSlide}>
									<figure className={styles.listTabCard} key={programEL.id}>
										<div className={styles.imgWrapper}>
											<img src={programEL?.photo[0]?.original ?? skeleton} alt='' />
										</div>
										<figcaption>
											<Link to={`https://этноспорт.рф/events/1/event-program/${programEL.id}`}>
												<h3 className={styles.programTitle}>{programEL.title}</h3>
											</Link>
											<p className={styles.programTime}>{programEL.time}</p>
											<p className={styles.programPlace}>{programEL.place}</p>
											{/* {programEL.use_reg === 1 && (
												<MainButton as='route' to={'#'} className={styles.requestBtn}>
													Подать заявку
												</MainButton>
											)}
												*/}
										</figcaption>
									</figure>
								</SwiperSlide>
							))}
						</div>
					</Swiper>
					<SliderBtns
						className={styles.subEventsSliderBtns}
						swiperRef={swiperRef}
						color={'black'}
					/>
				</>
			) : (
				<div className={styles.listTabs}>
					{list.map((programEL) => (
						<figure className={styles.listTabCard} key={programEL.id}>
							<div className={styles.imgWrapper}>
								<img src={programEL?.photo[0]?.original ?? skeleton} alt='' />
							</div>
							<figcaption>
								<Link to={`https://этноспорт.рф/events/1/event-program/${programEL.id}`}>
									<h3 className={styles.programTitle}>{programEL.title}</h3>
								</Link>
								<p className={styles.programTime}>{programEL.time}</p>
								<p className={styles.programPlace}>{programEL.place}</p>
								{/* {programEL.use_reg === 1 && (
												<MainButton as='route' to={'#'} className={styles.requestBtn}>
													Подать заявку
												</MainButton>
											)}
												*/}
							</figcaption>
						</figure>
					))}
				</div>
			)}
		</>
	)
}
