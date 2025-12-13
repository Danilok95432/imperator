import styles from '../../index.module.scss'
import { type FC } from 'react'
import { type SubEventOptions, type SelOption } from 'src/types/select'
import { useFormContext, useWatch } from 'react-hook-form'
import { ControlledCheckbox } from 'src/widgets/controlled-checkbox/controlled-checkbox'
import { FormInput } from 'src/widgets/FormInput/form-input'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { ControlledSelect } from 'src/widgets/controlled-select/controlled-select'
import { ParticipantsFields } from './components/ParticipantsFields/ParticiapantsFields'
import { ControlledMultipleSelect } from 'src/widgets/controlled-multiple-select/controlled-multiple-select'
import { useLocation } from 'react-router-dom'

type PartSectionProps = {
	selectOptionsGroup?: SelOption[]
	selectOptionsCars?: SelOption[]
	selectOptionsLager?: SelOption[]
	subEvents?: SubEventOptions[]
}

export const PartSection: FC<PartSectionProps> = ({
	selectOptionsGroup = [{ label: 'Не выбрано', value: '0' }],
	selectOptionsCars = [{ label: 'Не выбрано', value: '0' }],
	selectOptionsLager = [{ label: 'Не выбрано', value: '0' }],
	subEvents = [
		{ label: 'Не выбрано', value: '0', selected: false, use_group: false, id_event_role: '' },
	],
}) => {
	const { control } = useFormContext()
	const location = useLocation()

	const useGroup = useWatch({ control, name: 'use_group' })
	const groupType = useWatch({ control, name: 'id_event_role' })

	const useSportsmen = useWatch({ control, name: 'use_sportsmen' })
	const useFolk = useWatch({ control, name: 'use_folk' })
	const useMaster = useWatch({ control, name: 'use_master' })
	const useTrader = useWatch({ control, name: 'use_trader' })
	const useOrg = useWatch({ control, name: 'use_org' })
	const useVolunteer = useWatch({ control, name: 'use_volunteer' })
	const useJournalist = useWatch({ control, name: 'use_journalist' })
	const useCar = useWatch({ control, name: 'use_car' })
	const useLager = useWatch({ control, name: 'use_lager' })

	const groupDisabled = !useGroup
	const journalistDisabled = !useJournalist
	const carsDisabled = !useCar
	const lagerDisabled = !useLager

	const filteredEtnoList = subEvents.filter((el) => !el.use_group && el.id_event_role === '2')

	const filteredFunList = subEvents.filter((el) => !el.use_group && el.id_event_role === '4')

	const filteredGroupList = subEvents.filter(
		(el) =>
			el.use_group &&
			(groupType === '2'
				? el.id_event_role === '2'
				: groupType === '4'
					? el.id_event_role === '4'
					: el.id_event_role === '7'),
	)

	return (
		<div className={styles.formSection}>
			{!useSportsmen &&
				!useFolk &&
				!useMaster &&
				!useJournalist &&
				!useTrader &&
				!useVolunteer &&
				!useOrg && (
					<>
						<span className={styles.title}>1. Регистрация коллектива</span>
						<span className={styles.subtitle}>
							Здесь Вы можете зарегистрировать свой коллектив и получить пропуски на всех его
							участников. Личная регистрация доступна ниже и только в случае, если Вы не
							регистрировали коллектив.
						</span>
					</>
				)}
			<span className={styles.subtitle}>
				Обязательно выберите хотя бы один из доступных типов участия.
			</span>
			{useSportsmen ||
				useFolk ||
				useMaster ||
				useJournalist ||
				useTrader ||
				useVolunteer ||
				(!useOrg && (
					<div className={styles.checkBoxWrapper}>
						<div className={styles.headBox}>
							<ControlledCheckbox
								name='use_group'
								type='checkbox'
								disabled={
									useSportsmen ||
									useFolk ||
									useMaster ||
									useJournalist ||
									useTrader ||
									useVolunteer ||
									useOrg
								}
							/>
							<span>Ватага или коллектив</span>
						</div>
						<div className={styles.footerBox}>
							<p>Ваши личные данные указаны выше. Не нужно повторять их в составе группы.</p>
							<FlexRow className={styles.guestWrapper}>
								<FlexRow className={styles.groupMultiSelectRow}>
									<FlexRow className={styles.groupGuestsInputsStart}>
										<FormInput
											name='group_name'
											label='Название группы'
											disabled={groupDisabled}
											className={styles.groupGuestInputMain}
										/>
										<FlexRow className={styles.groupGuestsInputsStartInner}>
											<ControlledSelect
												className={styles.selectForm}
												name='id_event_role'
												selectOptions={selectOptionsGroup.filter(
													(el) => el.label !== 'Торговцы' && el.label !== 'Мастера',
												)}
												disabled={groupDisabled}
												label='Тип группы'
											/>
										</FlexRow>
									</FlexRow>
									{groupType === '8' && (
										<FormInput
											name='trader_name_group'
											label='Описание товаров'
											className={styles.noMargin}
											disabled={groupDisabled}
										/>
									)}
									{groupType === '7' && (
										<FormInput
											name='master_name_group'
											label='Название промысла'
											className={styles.noMargin}
											disabled={groupDisabled}
										/>
									)}
									{groupType === '5' && (
										<FormInput
											name='journal_name_group'
											label='Название издания, студии или канала'
											className={styles.noMargin}
											disabled={groupDisabled}
										/>
									)}
									<ControlledMultipleSelect
										className={styles.groupMultiSelect}
										name='sub_events_group'
										label='Подсобытия'
										selectOptions={
											filteredGroupList ?? [
												{
													label: 'Не выбрано',
													value: '0',
													selected: false,
													use_group: false,
													id_event_role: '',
												},
											]
										}
										placeholder='Выберите подсобытия'
										disabled={
											!useGroup || (groupType !== '2' && groupType !== '4' && groupType !== '7')
										}
									/>
								</FlexRow>
								<div className={styles.guestsList}>
									<ParticipantsFields disabled={groupDisabled} />
								</div>
							</FlexRow>
						</div>
					</div>
				))}
			{!useGroup && (
				<>
					<span className={styles.title}>2. Личная регистрация</span>
					<span className={styles.subtitle}>
						Здесь Вы можете зарегистрироваться на отдельные виды программы (подсобытия), если
						приехали на игры без компании. В случае, если Вы будете регистрировать коллектив, этот
						раздел будет скрыт.
					</span>
				</>
			)}
			{!useGroup && (
				<>
					<div className={styles.checkBoxWrapper}>
						<div className={styles.headBox}>
							<ControlledCheckbox name='use_sportsmen' type='checkbox' disabled={useGroup} />
							<span>Этноспорт</span>
						</div>
						<div className={styles.footerBox}>
							<ControlledMultipleSelect
								name='sub_events_etno'
								label='Подсобытия'
								selectOptions={
									filteredEtnoList ?? [
										{
											label: 'Не выбрано',
											value: '0',
											selected: false,
											use_group: false,
											id_event_role: '',
										},
									]
								}
								placeholder='Выберите подсобытия'
								margin='0 0 10px 0'
								disabled={
									!useSportsmen ||
									(selectOptionsGroup.find((el) => el.value === groupType)?.label !==
										'Спортивная команда' &&
										useGroup)
								}
							/>
						</div>
					</div>
					<div className={styles.checkBoxWrapper}>
						<div className={styles.headBox}>
							<ControlledCheckbox name='use_folk' type='checkbox' disabled={useGroup} />
							<span>Фольклорная программа</span>
						</div>
						<div className={styles.footerBox}>
							<ControlledMultipleSelect
								name='sub_events_fun'
								label='Подсобытия'
								selectOptions={
									filteredFunList ?? [
										{
											label: 'Не выбрано',
											value: '0',
											selected: false,
											use_group: false,
											id_event_role: '',
										},
									]
								}
								placeholder='Выберите подсобытия'
								margin='0 0 10px 0'
								disabled={
									!useFolk ||
									(selectOptionsGroup.find((el) => el.value === groupType)?.label !==
										'Фольклорный коллектив' &&
										useGroup)
								}
							/>
						</div>
					</div>
					<div className={styles.checkBoxWrapper}>
						<div className={styles.headBoxSpecial}>
							<ControlledCheckbox name='use_org' type='checkbox' disabled={useGroup} />
							<span>Я организатор.</span>
						</div>
					</div>
					<div className={styles.checkBoxWrapper}>
						<div className={styles.headBoxSpecial}>
							<ControlledCheckbox name='use_volunteer' type='checkbox' disabled={useGroup} />
							<span>Я волонтер.</span>
						</div>
					</div>
					<div className={styles.checkBoxWrapper}>
						<div className={styles.headBox}>
							<ControlledCheckbox name='use_journalist' type='checkbox' disabled={useGroup} />
							<span>Я — журналист</span>
						</div>
						<div className={styles.footerBox}>
							<FormInput
								name='journal_name'
								label='Название издания, студии или канала'
								className={styles.noMargin}
								disabled={journalistDisabled}
							/>
						</div>
					</div>
				</>
			)}
			{!location.pathname.includes('/terminal') && (
				<>
					<div className={styles.checkBoxWrapper}>
						<div className={styles.headBox}>
							<ControlledCheckbox name='use_car' type='checkbox' />
							<span>Еду на машине, нужна парковка</span>
						</div>
						<div className={styles.footerBox}>
							<FlexRow className={styles.groupInputsStart}>
								<div className={styles.carsList}>
									<ControlledSelect
										className={styles.selectForm}
										name={`id_car_type`}
										selectOptions={selectOptionsCars}
										disabled={carsDisabled}
										label='Тип ТС'
									/>
									<FormInput name={`car_number`} label='Госномер' disabled={carsDisabled} />
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
				</>
			)}
		</div>
	)
}
