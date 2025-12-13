import { useGetEventProgramByIdQuery } from 'src/features/home/api/home.api'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { useState, useRef, type RefObject } from 'react'
import { MainProgramNav } from 'src/widgets/main-program-navigation/main-program-nav'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { programSliderOptions } from './consts'
import { Link } from 'react-router-dom'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { toast } from 'react-toastify'
import { CopySVG } from 'src/shared/ui/icons/copySVG'
import { MainInfoPlaceSVG } from 'src/shared/ui/icons/mainInfoPlaceSVG'

export const ProgramSection = () => {
	const { data: programDays } = useGetEventProgramByIdQuery('1')
	const [activeDayId, setActiveDayId] = useState(1)
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	// состояние "развернуто/свернуто"
	const [isExpanded, setIsExpanded] = useState<boolean>(false)

	const navDays = programDays?.map((day) => ({ id: day.id, date: day.date }))

	const goToDay = (dayId: number) => {
		setActiveDayId(dayId)
		const index = programDays?.findIndex((day) => day.id === dayId) ?? 0
		swiperRef.current?.swiper.slideTo(index, 500)

		// при смене дня сворачиваем список
		setIsExpanded(false)
	}

	const getGroupedProgram = () => {
		const list = programDays?.find((day) => day.id === activeDayId)?.programList ?? []
		const grouped = list.reduce<Record<string, typeof list>>((acc, programEl) => {
			const place = programEl.place || 'Место не указано'
			if (!acc[place]) {
				acc[place] = []
			}
			acc[place].push(programEl)
			return acc
		}, {})
		if (activeDayId === 1) {
			const CENTRAL_FIELD = 'Центральное поле'
			const orderedGroups: Record<string, typeof list> = {}
			if (grouped[CENTRAL_FIELD]) {
				orderedGroups[CENTRAL_FIELD] = grouped[CENTRAL_FIELD]
			}
			Object.keys(grouped).forEach((place) => {
				if (place !== CENTRAL_FIELD) {
					orderedGroups[place] = grouped[place]
				}
			})
			return orderedGroups
		}
		return grouped
	}

	const handleCopyDataProgram = () => {
		const currentDay = programDays?.find((day) => day.id === activeDayId)
		if (!currentDay) return
		let textToCopy = `Программа на ${currentDay.date}\n\n`

		const dayTitle =
			activeDayId === 1
				? 'Основной день игр'
				: activeDayId === 2
					? 'Последний день игр'
					: 'Первый день игр'
		textToCopy += `${dayTitle}\n\n`
		const groupedProgram = getGroupedProgram()
		for (const [place, items] of Object.entries(groupedProgram)) {
			textToCopy += `${place}:\n`
			for (const item of items) {
				textToCopy += `${item.time} - ${item.title}\n`
			}
			textToCopy += '\n'
		}
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				toast.success('Данные программы в буфере обмена', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})
			})
			.catch(() => {
				toast.error('Произошла ошибка при копировании', {
					position: 'bottom-right',
				})
			})
	}

	return (
		<Section id='program' className={cn(styles.program)}>
			<Container>
				<FlexRow className={styles.programWrapper}>
					<FlexRow className={styles.programHeadRow}>
						<h1>Программа</h1>
						<FlexRow className={styles.programControlsRow}>
							<MainProgramNav
								days={navDays ?? [{ id: 1, date: new Date() }]}
								activeDayId={activeDayId}
								changeSlide={goToDay}
							/>
							<FlexRow className={styles.copyRow}>
								<p className={styles.day}>
									{activeDayId === 1
										? 'Основной день игр'
										: activeDayId === 2
											? 'Последний день игр'
											: 'Первый день игр'}
								</p>
								<MainButton className={styles.copyBtn} onClick={handleCopyDataProgram}>
									<CopySVG />
									<p>Копировать программу дня</p>
								</MainButton>
							</FlexRow>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.contentRow}>
						<Swiper
							{...programSliderOptions}
							ref={swiperRef}
							initialSlide={programDays?.findIndex((day) => day.id === activeDayId) ?? 1}
							className={styles.programSlider}
							onSlideChange={(swiper) => {
								const currentIndex = swiper.activeIndex
								const currentDayId = programDays?.[currentIndex]?.id
								if (currentDayId !== undefined) {
									setActiveDayId(currentDayId)
									// при смене слайда тоже сворачиваем список
									setIsExpanded(false)
								}
							}}
						>
							{programDays?.map((day) => {
								// группы для активного дня
								const groupedProgramEntries = Object.entries(getGroupedProgram())
								const visibleGroups = isExpanded
									? groupedProgramEntries
									: groupedProgramEntries.slice(0, 1)
								const hasMoreGroups = groupedProgramEntries.length > 1

								return (
									<SwiperSlide key={day.id}>
										<FlexRow
											className={cn(styles.programList, {
												[styles.programList_collapsed]: !isExpanded,
											})}
										>
											{visibleGroups.map(([place, items]) => (
												<div key={place} className={styles.group}>
													<FlexRow className={styles.location}>
														<MainInfoPlaceSVG />
														<p className={styles.placeTitle}>{place}</p>
													</FlexRow>
													{items.map((programEl) => (
														<FlexRow key={programEl.id} className={styles.elRow}>
															<p>{programEl.time}</p>
															{programEl?.use_real ? (
																<Link
																	to={`https://этноспорт.рф/events/1/event-program/${programEl.id}`}
																>
																	{programEl.title}
																</Link>
															) : (
																<p>{programEl.title}</p>
															)}
														</FlexRow>
													))}
												</div>
											))}
										</FlexRow>

										{hasMoreGroups && (
											<button
												className={cn(styles.showMoreBtn, {
													[styles._active]: isExpanded,
												})}
												onClick={() => setIsExpanded((prev) => !prev)}
											>
												{isExpanded ? 'Свернуть' : 'Показать ещё'}
											</button>
										)}
									</SwiperSlide>
								)
							})}
						</Swiper>
					</FlexRow>
					<MainButton className={styles.copyBtn} onClick={handleCopyDataProgram}>
						<CopySVG />
						<p>Копировать программу дня</p>
					</MainButton>
				</FlexRow>
			</Container>
		</Section>
	)
}
