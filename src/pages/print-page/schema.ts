import * as yup from 'yup'

export type checkInputs = {
	phone: string
	code: string
}

export const checkSchema = yup.object().shape({
	phone: yup.string().required('Введите номер телефона').min(10, 'Недостаточно цифр в номере'),
	code: yup.string().required('Введите верный код'),
})
