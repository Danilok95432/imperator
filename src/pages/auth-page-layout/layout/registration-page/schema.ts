import * as yup from 'yup'

export type RegInputs = {
	name: string
	secondName: string
	email: string
	phone: string
	password: string
	repeatPassword: string
}

export const regInputsSchema = yup.object().shape({
	// Проверка имени
	name: yup
		.string()
		.required('Введите имя')
		.min(2, 'Имя должно содержать минимум 2 символа')
		.max(30, 'Имя не должно превышать 30 символов')
		.matches(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, 'Имя может содержать только буквы, пробел и дефис'),

	// Проверка фамилии
	secondName: yup
		.string()
		.required('Введите фамилию')
		.min(2, 'Фамилия должна содержать минимум 2 символа')
		.max(30, 'Фамилия не должна превышать 30 символов')
		.matches(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, 'Фамилия может содержать только буквы, пробел и дефис'),

	// Проверка email
	email: yup
		.string()
		.required('Введите почту')
		.email('Введите корректный email адрес')
		.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Введите корректный email адрес'),

	// Проверка телефона - 11 цифр
	phone: yup
		.string()
		.required('Введите номер телефона')
		.matches(/^\d{11}$/, 'Номер телефона должен состоять из 11 цифр'),

	// Проверка пароля
	password: yup
		.string()
		.required('Введите пароль')
		.min(6, 'Пароль должен содержать минимум 6 символов'),

	// Проверка повторения пароля
	repeatPassword: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
})
