import { type FieldValues } from 'react-hook-form'

export interface DateTimeFormatOptions {
	localeMatcher?: 'best fit' | 'lookup' | undefined
	weekday?: 'long' | 'short' | 'narrow' | undefined
	era?: 'long' | 'short' | 'narrow' | undefined
	year?: 'numeric' | '2-digit' | undefined
	month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined
	day?: 'numeric' | '2-digit' | undefined
	hour?: 'numeric' | '2-digit' | undefined
	minute?: 'numeric' | '2-digit' | undefined
	second?: 'numeric' | '2-digit' | undefined
	timeZoneName?:
		| 'short'
		| 'long'
		| 'shortOffset'
		| 'longOffset'
		| 'shortGeneric'
		| 'longGeneric'
		| undefined
	formatMatcher?: 'best fit' | 'basic' | undefined
	hour12?: boolean | undefined
	timeZone?: string | undefined
}

// функция форматирования флагов для отправки на сервер
export const booleanToNumberString = (bool: boolean | undefined): string => {
	return bool ? '1' : '0'
}

export const setActive = (isActive: boolean, styles: string) => (isActive ? styles : '')

// форматирование данных с формы в виде объекта в формат FormData
export const transformToFormData = (data: FieldValues) => {
	const formData = new FormData()

	Object.keys(data).forEach((key) => {
		const value = data[key]
		if (value instanceof File || value instanceof Blob) {
			formData.append(key, value)
		} else {
			formData.append(key, String(value))
		}
	})

	return formData
}
