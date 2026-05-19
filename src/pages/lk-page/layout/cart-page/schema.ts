import { type SelOption } from 'src/types/select'
import * as yup from 'yup'

export type OrderInputs = {
	citys: SelOption[] | string
	deliveryId: string
	paymentId: string
	firstname: string
	surname: string
	email: string
	telphone: string
	street: string
	house: string
	apartment: string
	comment: string
}

export const orderInputsSchema = yup.object({
	citys: yup
		.mixed<SelOption[] | string>()
		.defined()
		.test('city-selected', 'Выберите город доставки', (value) => {
			if (Array.isArray(value)) {
				return Boolean(value[0]?.value && value[0].value !== '0')
			}

			if (typeof value === 'string') {
				return Boolean(value.trim() && value !== '0')
			}

			return false
		}),

	deliveryId: yup.string().required('Выберите способ доставки'),

	paymentId: yup.string().required('Выберите способ оплаты'),

	firstname: yup
		.string()
		.required('Введите имя')
		.min(2, 'Имя должно содержать минимум 2 символа')
		.max(30, 'Имя не должно превышать 30 символов')
		.matches(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, 'Имя может содержать только буквы, пробел и дефис'),

	surname: yup
		.string()
		.required('Введите фамилию')
		.min(2, 'Фамилия должна содержать минимум 2 символа')
		.max(30, 'Фамилия не должна превышать 30 символов')
		.matches(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, 'Фамилия может содержать только буквы, пробел и дефис'),

	email: yup.string().required('Введите почту').email('Введите корректный email адрес'),

	telphone: yup
		.string()
		.required('Введите номер телефона')
		.test('phone-length', 'Номер телефона должен содержать 11 цифр', (value) => {
			if (!value) return false

			const numbers = value.replace(/\D/g, '')

			return numbers.length === 11
		}),

	street: yup
		.string()
		.required('Введите улицу')
		.min(2, 'Улица должна содержать минимум 2 символа')
		.max(100, 'Улица не должна превышать 100 символов'),

	house: yup.string().required('Введите дом').max(20, 'Слишком длинное значение'),

	apartment: yup.string().required('Введите квартиру или офис').max(20, 'Слишком длинное значение'),

	comment: yup.string().max(500, 'Комментарий не должен превышать 500 символов').defined(),
})
