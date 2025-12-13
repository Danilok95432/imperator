/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/naming-convention */
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form'
import styles from './index.module.scss'
import { type FC, useEffect } from 'react'
import { type SelOption } from 'src/types/select'
import { FormInput } from 'src/widgets/FormInput/form-input'
import { ControlledSelect } from 'src/widgets/controlled-select/controlled-select'

type CarFieldsProps = {
	selectOptionsCars?: SelOption[]
	disabled?: boolean
}

export const CarFields: FC<CarFieldsProps> = ({
	selectOptionsCars = [{ label: 'Не выбрано', value: '0' }],
	disabled,
}) => {
	const { control } = useFormContext()
	const { fields, append, remove } = useFieldArray({
		name: 'cars_list',
		control,
	})

	const count_ts = useWatch({ control, name: 'cars_count' })

	useEffect(() => {
		const targetCount = parseInt(count_ts || '1', 10)
		const currentCount = fields.length

		if (targetCount === currentCount) return

		if (targetCount > currentCount) {
			const itemsToAdd = Array(targetCount - currentCount).fill({ type: '0', password: '' })
			append(itemsToAdd, { shouldFocus: false })
		} else {
			const indexesToRemove = Array.from(
				{ length: currentCount - targetCount },
				(_, i) => currentCount - 1 - i,
			)
			remove(indexesToRemove)
		}
	}, [count_ts])

	const displayCount = Math.max(parseInt(count_ts || '1', 10), 1)
	const displayFields = fields.slice(0, displayCount)

	return (
		<>
			{displayFields.map((field, index) => (
				<div key={field.id} className={styles.carsWrapper}>
					<ControlledSelect
						className={styles.selectForm}
						name={`cars_list[${index}].car_type`}
						selectOptions={selectOptionsCars}
						disabled={disabled}
						label='Тип ТС'
					/>
					<FormInput name={`cars_list[${index}].car_number`} label='Госномер' disabled={disabled} />
				</div>
			))}
		</>
	)
}
