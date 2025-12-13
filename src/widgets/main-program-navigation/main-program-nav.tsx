import { type FC } from 'react'

import styles from './index.module.scss'
import cn from 'classnames'
import { mainFormatDate } from 'src/shared/helpers/utils'

type DayNav = {
	id: number
	date: Date
}

type ProgramNavProps = {
	days: DayNav[]
	activeDayId: number
	changeSlide: (dayId: number) => void
}

export const MainProgramNav: FC<ProgramNavProps> = ({ days, activeDayId, changeSlide }) => {
	return (
		<ul className={styles.programNav}>
			{days.map((el) => (
				<li
					className={cn({ [styles._active]: activeDayId === el.id })}
					key={el.id}
					onClick={() => changeSlide(el.id)}
				>
					{mainFormatDate(el.date, 'dd MMMM')}
					<span className={cn(styles.line, { [styles._activeLine]: activeDayId === el.id })}></span>
				</li>
			))}
		</ul>
	)
}
