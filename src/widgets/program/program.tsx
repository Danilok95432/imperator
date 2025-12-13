import { type FC, useState } from 'react'
import { type ProgramDay } from 'src/types/program'
import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { ProgramList } from './components/program-list/program-list'
import { ProgramNav } from './components/program-nav/program-nav'

type EventProgramProps = {
	programDays: ProgramDay[] | []
	parentView?: string
	defaultActiveDay?: number
}

export const Program: FC<EventProgramProps> = ({
	programDays,
	parentView = 'list',
	defaultActiveDay = 0,
}) => {
	const [activeDayId, setActiveDayId] = useState(defaultActiveDay)

	const filteredDays = programDays.filter((day) =>
		day.programList.some((program) => program.use_real === 1),
	)

	const safeActiveDayId = filteredDays.some((day) => day.id === activeDayId)
		? activeDayId
		: filteredDays[0]?.id || 0

	const navDays = filteredDays.map((day) => ({
		id: day.id,
		date: day.date,
	}))

	const handleChangeActiveDay = (id: number) => {
		setActiveDayId(id)
	}

	const getActiveProgram = () => {
		const currentDay = programDays.find((day) => day.id === safeActiveDayId)
		return currentDay?.programList?.filter((program) => program.use_real === 1) ?? []
	}

	if (!programDays?.length) return <h4>нет программы</h4>

	return (
		<div className={styles.head}>
			<FlexRow className={styles.headProgram}>
				<ProgramNav
					days={navDays}
					activeDayId={safeActiveDayId}
					onChangeActiveDay={handleChangeActiveDay}
				/>
			</FlexRow>
			<ProgramList list={getActiveProgram()} viewMode={'tab'} />
		</div>
	)
}
