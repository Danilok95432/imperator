/* eslint-disable @typescript-eslint/naming-convention */
import { type GuestCarsList, type GuestGroupList } from 'src/types/registration'
import { type SubEventOptions } from 'src/types/select'
import * as yup from 'yup'

export type RegInputs = {
	surname: string
	firstname: string
	fathname?: string
	age?: string
	birthdate?: string
	id_region: string
	id_city: string
	city_name?: string
	email: string
	phone: string
	code: string
	id_reg_type?: string
	id_event?: string
	use_group?: boolean
	group_name?: string
	id_group_type?: string
	id_event_role?: string
	group_count?: string
	group_list?: GuestGroupList[] | null
	sub_events_group?: SubEventOptions[] | string
	sub_events_etno?: SubEventOptions[] | string
	sub_events_fun?: SubEventOptions[] | string
	use_org?: boolean
	use_volunteer?: boolean
	trader_name?: string
	use_lager?: boolean
	id_lager_type?: string
	lager_count?: string
	data_zaezd?: string
	data_viezd?: string
	use_sportsmen?: boolean
	use_folk?: boolean
	use_trader?: boolean
	use_master?: boolean
	master_name?: string
	id_car_type?: string
	car_number?: string
	use_journalist?: boolean
	journal_name?: string
	use_car?: boolean
	cars_count?: string
	cars_list?: GuestCarsList[]
	trader_name_group?: string
	master_name_group?: string
	journal_name_group?: string
}

const guestGroupItemSchema = yup.object().shape({
	age: yup
		.string()
		.required('Возраст обязателен')
		.matches(/^[0-9]+$/, 'Возраст должен содержать только цифры'),

	surname: yup
		.string()
		.required('Фамилия обязательна')
		.matches(/^[а-яА-ЯёЁa-zA-Z\- ]+$/, 'Фамилия содержит недопустимые символы'),

	firstname: yup
		.string()
		.required('Имя обязательно')
		.matches(/^[а-яА-ЯёЁa-zA-Z\- ]+$/, 'Имя содержит недопустимые символы'),

	fathname: yup
		.string()
		.notRequired()
		.matches(/^[а-яА-ЯёЁa-zA-Z\- ]*$/, 'Отчество содержит недопустимые символы'),
})

export const groupListSchema = yup.array().of(guestGroupItemSchema).defined()

export const regSchema = yup.object().shape({
	surname: yup.string().required('Введите фамилию'),
	firstname: yup.string().required('Введите имя'),
	code: yup.string().required('Введите верный код'),
	id_region: yup
		.string()
		.required('Введите регион')
		.test('contains-comma', 'Выберите регион из списка', (value) => {
			return value === 'Иностранец' || value.includes(',')
		}),
	id_city: yup.string().required('Введите название населенного пункта'),
	email: yup.string().required('Введите электронную почту').email('Введите верную почту'),
	phone: yup.string().required('Введите номер телефона').min(10, 'Недостаточно цифр в номере'),
	use_group: yup.boolean(),
	group_list: yup.lazy((_, context) => {
		console.log(context.parent.use_group)
		return context.parent.use_group === true
			? groupListSchema.required('Добавьте хотя бы одного участника группы').defined()
			: yup.mixed().notRequired()
	}),
})
