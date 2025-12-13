import * as yup from 'yup'

export type AuthInputs = {
	phone: string
	password: string
}

export const authSchema = yup.object().shape({
	phone: yup.string().required('Введите номер телефона'),
	password: yup.string().required('Введите пароль'),
	// verificationCode: yup.string().required('Введите проверочный код'),
})
