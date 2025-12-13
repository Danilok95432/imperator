import cn from 'classnames'
import styles from '../../index.module.scss'
import { type SelOption } from 'src/types/select'
import { type FC } from 'react'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { ControlledSelect } from 'src/widgets/controlled-select/controlled-select'
import { useLocation } from 'react-router-dom'

type DatesSectionProps = {
	selectOptions?: SelOption[]
}

export const DatesSection: FC<DatesSectionProps> = ({
	selectOptions = [{ label: 'Не выбрано', value: '0' }],
}) => {
	const location = useLocation()
	if (!location.pathname.includes('/terminal'))
		return (
			<div className={cn(styles.formSection, styles._last)}>
				<span className={styles.title}>Даты заезда и выезда</span>
				<FlexRow className={styles.groupInputs}>
					<ControlledSelect
						className={styles.selectForm}
						name='data_zaezd'
						selectOptions={selectOptions}
						label='Дата заезда'
					/>
					<ControlledSelect
						className={styles.selectForm}
						name='data_viezd'
						selectOptions={selectOptions}
						label='Дата отъезда'
					/>
				</FlexRow>
			</div>
		)
}
