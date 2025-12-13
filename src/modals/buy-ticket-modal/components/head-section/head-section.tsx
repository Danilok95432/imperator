import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import styles from '../../index.module.scss'
import { type FC } from 'react'
import { type SelOption } from 'src/types/select'
import { ControlledSelect } from 'src/widgets/controlled-select/controlled-select'
import { FormInput } from 'src/widgets/FormInput/form-input'

type InfoSectionProps = {
	ticketTypeList?: SelOption[]
}

export const HeadSection: FC<InfoSectionProps> = ({
	ticketTypeList = [{ label: 'Премиум Бизнес (включает ужин со звездой)', value: '0' }],
}) => {
	return (
		<div className={styles.formSection}>
			<span className={styles.title}>Купить билеты</span>
			<FlexRow className={styles.groupInputs}>
				<ControlledSelect
					className={styles.selectForm}
					name={`ticketTypeList`}
					selectOptions={ticketTypeList}
					label='Выбор вида билета'
				/>
				<FormInput name='count' label='Количество' className={styles.inputCont} />
			</FlexRow>
			<p className={styles.billTotal}>
				{`1 билет на сумму`}
				<strong>{`2000 ₽`}</strong>
			</p>
			<FlexRow className={styles.infoBlock}>
				<p>
					Осталось <span>899</span> билетов
				</p>
				<p>
					<strong>Внимание! </strong> За то время, пока Вы заполняете форму, количество доступных
					билетов может измениться!
				</p>
			</FlexRow>
			<p className={styles.desc}>
				Описание билета на две-три строки. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			</p>
		</div>
	)
}
