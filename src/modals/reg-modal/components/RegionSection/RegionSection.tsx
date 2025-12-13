import { type FC } from 'react'
import styles from '../../index.module.scss'
import { type SelOption } from 'src/types/select'
import { useFormContext, useWatch } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { FormInput } from 'src/widgets/FormInput/form-input'

type RegionSectionProps = {
	regions?: SelOption[]
	citys?: SelOption[]
	lockSearch?: boolean
	setLockSearch?: (arg0: boolean) => void
}

export const RegionSection: FC<RegionSectionProps> = ({
	regions = [{ label: '', value: '' }],
	citys = [{ label: '', value: '' }],
	lockSearch,
	setLockSearch,
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()
	const region = useWatch({ control, name: 'id_region' })
	const cityList = useWatch({ control, name: 'id_city' })
	return (
		<div className={styles.formSection}>
			<span className={styles.title}>Регион и населенный пункт</span>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='id_region'
					label='Регион РФ'
					className={styles.noMargin}
					is_select
					selectOptions={regions ?? [{ label: 'Не выбрано', value: '0' }]}
				/>
				{errors.id_region && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name={'id_region'} />
					</p>
				)}
				<span>
					Начните ввод названия региона и выберите из предложенных вариантов. Если Вы не из России,
					наберите «ино» и выберите вариант «Иностранец».
				</span>
			</div>
			<div className={styles.inputwithLabel}>
				<FormInput
					name='id_city'
					label='Населенный пункт'
					className={styles.noMargin}
					is_select
					is_city_select
					lockSearch={lockSearch}
					setLockSearch={setLockSearch}
					selectOptions={citys ?? [{ label: 'Не выбрано', value: '0' }]}
					disabled={!region}
					disabledList={(cityList?.length ?? 0) < 2}
				/>
				{errors.id_city && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name={'id_city'} />
					</p>
				)}
				<span>
					После выбора региона начните ввод названия Вашего города (села, поселка, хутора, станицы)
					и выберите верный из предложенных вариантов. Если ранее Вы выбрали вариант «Иностранец», в
					этом поле нужно ввести название государства.
				</span>
			</div>
		</div>
	)
}
