import * as yup from 'yup'

export type OrderInputs = {
	city: string
	deliveryId: string
	paymentId: string
	name: string
	secondName: string
	email: string
	phone: string
	street: string
	house: string
	apartment: string
	comment?: string
}

export const orderInputsSchema = yup.object().shape({
	city: yup
		.string()
		.required('Введите город доставки')
		.min(2, 'Город должен содержать минимум 2 символа')
		.max(50, 'Город не должен превышать 50 символов'),

	deliveryId: yup.string().required('Выберите способ доставки'),

	paymentId: yup.string().required('Выберите способ оплаты'),

	name: yup
		.string()
		.required('Введите имя')
		.min(2, 'Имя должно содержать минимум 2 символа')
		.max(30, 'Имя не должно превышать 30 символов')
		.matches(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, 'Имя может содержать только буквы, пробел и дефис'),

	secondName: yup
		.string()
		.required('Введите фамилию')
		.min(2, 'Фамилия должна содержать минимум 2 символа')
		.max(30, 'Фамилия не должна превышать 30 символов')
		.matches(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, 'Фамилия может содержать только буквы, пробел и дефис'),

	email: yup.string().required('Введите почту').email('Введите корректный email адрес'),

	phone: yup
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

	comment: yup.string().max(500, 'Комментарий не должен превышать 500 символов'),
})
