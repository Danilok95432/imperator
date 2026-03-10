import * as yup from 'yup'

export type AuthInputs = {
	email: string
	password: string
}

export const authInputsSchema = yup.object().shape({
	email: yup
		.string()
		.required('Введите почту')
		.email('Введите корректный email адрес')
		.matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Введите корректный email адрес'),
	password: yup.string().required('Введите пароль'),
})
