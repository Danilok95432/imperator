import { useFormContext, useFieldArray } from 'react-hook-form'
import styles from './index.module.scss'
import { useEffect, type FC, type MouseEvent } from 'react'
import { FormInput } from 'src/widgets/FormInput/form-input'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { TrashIconSvg } from 'src/shared/ui/icons/trashIconSVG'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { type RegGuestInputs } from 'src/modals/reg-guest-modal/schema'

type GuestFieldsProps = {
	disabled?: boolean
}

export const GuestFields: FC<GuestFieldsProps> = ({ disabled = false }) => {
	const { control, getValues, setValue } = useFormContext<RegGuestInputs>()
	const { fields, append, remove } = useFieldArray({
		name: 'group_list',
		control,
	})

	useEffect(() => {
		const currentList = getValues('group_list') ?? []
		const undefinedItemsIndexes = currentList
			.map((item, index) =>
				item?.surname === undefined ||
				item?.firstname === undefined ||
				item?.fathname === undefined ||
				item?.age === undefined
					? index
					: -1,
			)
			.filter((index) => index !== -1)
			.reverse()

		if (undefinedItemsIndexes.length > 0) {
			undefinedItemsIndexes.forEach((index) => {
				remove(index)
			})
		}
	}, [fields, getValues, remove, setValue])

	const handleAddGuest = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		append(
			{
				age: '',
				surname: '',
				firstname: '',
				fathname: '',
			},
			{ shouldFocus: false },
		)
	}

	const handleRemoveGuest = (index: number) => {
		remove(index)
	}

	return (
		<>
			{fields.map((field, index) => (
				<div key={field.id} className={styles.guestsWrapper}>
					<FlexRow className={styles.groupInputs}>
						<FormInput name={`group_list[${index}].surname`} label='Фамилия' disabled={disabled} />
						<FormInput name={`group_list[${index}].firstname`} label='Имя' disabled={disabled} />
					</FlexRow>
					<FlexRow className={styles.groupInputs}>
						<FormInput
							name={`group_list[${index}].fathname`}
							label='Отчество'
							disabled={disabled}
							className={styles.inputWrapperContainer}
						/>
						<FormInput
							name={`group_list[${index}].age`}
							label='Возраст'
							disabled={disabled}
							className={styles.shortInput}
						/>
						<button
							className={styles.deleteButton}
							type='button'
							onClick={() => handleRemoveGuest(index)}
						>
							<TrashIconSvg />
						</button>
					</FlexRow>
				</div>
			))}

			<div className={styles.buttonsRow}>
				<MainButton type='button' onClick={handleAddGuest} disabled={disabled}>
					Добавить гостя
				</MainButton>
			</div>
		</>
	)
}
