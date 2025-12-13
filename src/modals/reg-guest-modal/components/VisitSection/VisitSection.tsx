import styles from '../../index.module.scss'
import { CarsFields } from './components/CarsFields/CarFields'
import { type FC } from 'react'
import { type SelOption } from 'src/types/select'
import { useFormContext, useWatch } from 'react-hook-form'
import { ControlledCheckbox } from 'src/widgets/controlled-checkbox/controlled-checkbox'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { ControlledSelect } from 'src/widgets/controlled-select/controlled-select'
import { FormInput } from 'src/widgets/FormInput/form-input'

type VisitSectionProps = {
	selectOptionsLager?: SelOption[]
	selectOptionsCars?: SelOption[]
}

export const VisitSection: FC<VisitSectionProps> = ({
	selectOptionsLager = [{ label: 'Не выбрано', value: '0' }],
	selectOptionsCars = [{ label: 'Не выбрано', value: '0' }],
}) => {
	const { control } = useFormContext()

	const useCar = useWatch({ control, name: 'use_car' })
	const useLager = useWatch({ control, name: 'use_lager' })

	const carDisabled = !useCar
	const lagerDisabled = !useLager

	return (
		<div className={styles.formSection}>
			<span className={styles.title}>Посещение</span>

			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBox}>
					<ControlledCheckbox name='use_car' type='checkbox' />
					<span>Еду на машине, нужна парковка</span>
				</div>
				<div className={styles.footerBox}>
					<FlexRow className={styles.groupInputsStart}>
						<FormInput
							name='cars_count'
							label='Кол-во'
							className={styles.shortInput}
							disabled={carDisabled}
						/>
						<div className={styles.carsList}>
							<CarsFields disabled={carDisabled} selectOptionsCars={selectOptionsCars} />
						</div>
					</FlexRow>
				</div>
			</div>

			<div className={styles.checkBoxWrapper}>
				<div className={styles.headBox}>
					<ControlledCheckbox name='use_lager' type='checkbox' />
					<span>Нужно место в палаточном лагере</span>
				</div>
				<div className={styles.footerBox}>
					<FlexRow className={styles.groupInputs}>
						<ControlledSelect
							className={styles.selectForm}
							name='id_lager_type'
							selectOptions={selectOptionsLager}
							disabled={lagerDisabled}
							label='Лагерь'
						/>
						<FormInput
							name='lager_count'
							label='Всего палаток (1 шатер равен 3 палаткам)'
							className={styles.noMargin}
							disabled={lagerDisabled}
							isSmallLabel={true}
						/>
					</FlexRow>
				</div>
			</div>
		</div>
	)
}
