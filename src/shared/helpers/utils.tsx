import { type LinkItem, type SourceLink } from 'src/types/global'
import { type ShortDocument } from 'src/types/document'
import { type SelOption } from 'src/types/select'
import { format, isValid } from 'date-fns'
import { ru } from 'date-fns/locale'
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

export const getDayWord = (days: number): string => {
	if (days % 10 === 1 && days % 100 !== 11) {
		return 'день'
	} else if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) {
		return 'дня'
	} else {
		return 'дней'
	}
}

export const getDaysUntil = (): string => {
	const today = new Date()
	const targetDate = new Date('2025-08-24')
	if (today.getTime() === targetDate.getTime()) {
		return 'Игры завершились'
	}
	return 'Игры начались'
}

const monthNames = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
]

export const mainFormatMonthDate = (
	date: Date | string | undefined,
	dateFormat = 'dd MMMM yyyy',
): string | null => {
	if (!date) return null

	const formatedDate = typeof date === 'string' ? new Date(date) : date
	const monthIndex = formatedDate.getMonth()
	const monthName = monthNames[monthIndex]

	return `${monthName}`
}

export const formatDateTimeSimple = (dateString: Date): string => {
	try {
		const date = new Date(dateString)
		if (isNaN(date.getTime())) {
			throw new Error('Invalid date string')
		}
		return format(date, 'd MMMM yyyy, HH:mm', { locale: ru })
	} catch (error) {
		console.error('Error formatting date:', error)
		return 'Некорректная дата'
	}
}

// функция форматирования даты для отправки на сервер в формате YYYY-MM-DD
export const formatDateToYYYYMMDD = (date: Date | string | null | undefined): string => {
	if (date === '') return ''

	if (!date) {
		return 'Invalid Date'
	}

	let parsedDate: Date

	if (typeof date === 'string') {
		try {
			parsedDate = new Date(date)
			if (isNaN(parsedDate.getTime())) {
				return 'Invalid Date'
			}
		} catch (error) {
			return 'Invalid Date'
		}
	} else if (date instanceof Date) {
		parsedDate = date
	} else {
		return 'Invalid Date'
	}

	if (!isValid(parsedDate)) {
		return 'Invalid Date'
	}

	try {
		const formattedDate = format(parsedDate, 'yyyy-MM-dd')
		return formattedDate
	} catch (error) {
		console.error('Error formatting date:', error)
		return 'Invalid Date'
	}
}

// функция форматирования флагов для отправки на сервер
export const booleanToNumberString = (bool: boolean | undefined): string => {
	return bool ? '1' : '0'
}

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildFormDataGuestModal = (data: any): FormData => {
	const formData = new FormData()

	for (const key in data) {
		if (key === 'group_list' && data[key]) {
			// Обработка group_list в формате group_list[0].age, group_list[0].surname и т.д.
			const groupList = data[key]
			const length = groupList.age?.length || 0

			for (let i = 0; i < length; i++) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				formData.append(`group_list[${i}].age`, groupList.age[i] || '')
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				formData.append(`group_list[${i}].surname`, groupList.surname[i] || '')
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				formData.append(`group_list[${i}].firstname`, groupList.firstname[i] || '')
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				formData.append(`group_list[${i}].fathname`, groupList.fathname[i] || '')
			}
		} else if (key === 'cars_list' && data[key]) {
			// Обработка cars_list в формате cars_list[0].car_type, cars_list[0].car_number
			const carsList = data[key]
			const length = carsList.car_type?.length || 0

			for (let i = 0; i < length; i++) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				formData.append(`cars_list[${i}].car_type`, carsList.car_type[i] || '')
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				formData.append(`cars_list[${i}].car_number`, carsList.car_number[i] || '')
			}
		} else if (Array.isArray(data[key])) {
			// Обработка обычных массивов
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			data[key].forEach((value: any, i: number) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				formData.append(`${key}[${i}]`, value)
			})
		} else if (typeof data[key] === 'object' && data[key] !== null) {
			// Сериализация вложенных объектов (если нужно)
			formData.append(key, JSON.stringify(data[key]))
		} else if (data[key] !== undefined && data[key] !== null) {
			// Обработка простых значений
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			formData.append(key, data[key])
		}
	}

	return formData
}

export const formatTime = (seconds: number): string => {
	const mins = Math.floor(seconds / 60)
	const secs = seconds % 60
	return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export const formatDateToRussian = (dateString: Date): string => {
	const date = new Date(dateString)

	if (isNaN(date.getTime())) {
		throw new Error('Неверный формат даты')
	}

	const day = date.getDate()
	const month = date.getMonth()
	const year = date.getFullYear()

	const months = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря',
	]

	return `${day} ${months[month]} ${year} года`
}

// утилитарная функция для кастомного селекта
export const getValue = (value: string, options: SelOption[]) => {
	return value ? options.find((option) => option.value === value) : ''
}

// форматирует дату к формату - 24.03.1999

export const customFormatDate = (
	date?: string | Date,
	options: DateTimeFormatOptions = {
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		formatMatcher: 'best fit',
	},
	delimiter: '.' | '-' = '.',
) => {
	if (!date) return

	let formatDate: string | Date

	if (typeof date === 'string') {
		formatDate = new Date(date)
	} else {
		formatDate = date
	}

	return new Intl.DateTimeFormat('ru-RU', options).format(formatDate).replace(/\./g, delimiter)
}

// функция определения возраста по дате рождения

export const calculateAge = (birthDate?: Date | string, isDateOnly?: boolean) => {
	if (!birthDate) return null
	const now: Date = new Date()
	let parsedBirthDate: Date

	if (typeof birthDate === 'string') {
		parsedBirthDate = new Date(birthDate)
	} else {
		parsedBirthDate = birthDate
	}

	const diff: number = now.getTime() - parsedBirthDate.getTime()

	const ageDate: Date = new Date(diff)
	const age = Math.abs(ageDate.getUTCFullYear() - 1970)
	let ageString: string

	if (isDateOnly) return age.toString()

	if (age % 10 === 1 && age !== 11) {
		ageString = age.toString() + ' год'
	} else if (age % 10 >= 2 && age % 10 <= 4 && (age < 10 || age > 20)) {
		ageString = age.toString() + ' года'
	} else {
		ageString = age.toString() + ' лет'
	}

	return ageString
}

// форматирование номера телефона
export const formatPhoneNumber = (number: string) => {
	return number.replace(/[-()\s]/g, '')
}

// Форматирование ссылок на документы
export const formatDocumentLinks = (data: ShortDocument[] | undefined): LinkItem[] | undefined => {
	if (!data) return undefined
	return data.map((docItem) => ({
		id: docItem.id,
		link: docItem.link,
		titleLink: docItem.title,
		type: docItem.type,
		label: [`${docItem.type}-файл`, docItem.size],
	}))
}

// Форматирование ссылок с источником
export const formatSourceLinks = (data: SourceLink[] | undefined): LinkItem[] | undefined => {
	if (!data) return undefined
	return data.map((sourceLinkItem) => ({
		id: sourceLinkItem.id,
		link: sourceLinkItem.link,
		titleLink: sourceLinkItem.title,
		label: [mainFormatDate(sourceLinkItem.date), sourceLinkItem.source],
	}))
}

// Функция передачи кастомного класса для NavLink

export const setActive = (isActive: boolean, styles: string) => (isActive ? styles : '')

// Функция определения формата файла, принимает имя файла

export const defineFileFormat = (fileName: string) => {
	const formatFileArr = fileName.split('.')
	if (formatFileArr.length < 2) return ''
	return formatFileArr[formatFileArr.length - 1]
}

// функция форматирования даты с локализацией
export const mainFormatDate = (
	date: Date | string | undefined,
	dateFormat = 'dd MMMM yyyy',
): string | null => {
	if (!date) return null
	const formatedDate = typeof date === 'string' ? new Date(date) : date
	return format(formatedDate, dateFormat, { locale: ru })
}

export const parseTimeFromDate = (date: Date | string | undefined): string | null => {
	if (!date) return '12:00'
	const time =
		typeof date === 'string'
			? date.split('T')[1].split(':')[0] + ':' + date.split('T')[1].split(':')[1]
			: date.toDateString().split('T')[1].split(':')[0] +
				':' +
				date.toDateString().split('T')[1].split(':')[1]
	return time
}

export const getAgeString = (age: string): string => {
	const num = parseInt(age, 10)
	if (isNaN(num)) {
		return age
	}
	const lastDigit = num % 10
	const lastTwoDigits = num % 100
	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
		return `${num} лет`
	}
	switch (lastDigit) {
		case 1:
			return `${num} год`
		case 2:
		case 3:
		case 4:
			return `${num} года`
		default:
			return `${num} лет`
	}
}

export const formatSingleDate = (dateString: Date | string): string => {
	const date = new Date(dateString)

	if (isNaN(date.getTime())) {
		throw new Error(`Неверный формат даты: ${dateString}`)
	}

	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const year = date.getFullYear()

	return `${day}.${month}.${year}`
}

export const formatDateRangeNumeric = (dates: [Date, Date]): string => {
	if (!Array.isArray(dates) || dates.length !== 2) {
		throw new Error('Функция принимает массив ровно из двух дат')
	}

	const startDate = formatSingleDate(dates[0])
	const endDate = formatSingleDate(dates[1])

	return `${startDate} — ${endDate}`
}

export const formatDateRange = (
	[startDate, endDate]: [Date, Date] | [],
	separator: string = '—',
	isShortMonth = false,
): string | null => {
	if (!startDate || !endDate) return null

	const startMonth = format(startDate, 'MMMM', { locale: ru })
	const endMonth = format(endDate, 'MMMM', { locale: ru })
	const startYear = format(startDate, 'yyyy', { locale: ru })
	const endYear = format(endDate, 'yyyy', { locale: ru })

	if (startYear === endYear && startMonth !== endMonth) {
		return `${format(startDate, `d ${isShortMonth ? 'LLL' : 'MMMM'}`, { locale: ru }).replace('.', '')} ${separator} ${format(endDate, `d ${isShortMonth ? 'LLL' : 'MMMM'}`, { locale: ru }).replace('.', '')}`
	}
	if (startMonth === endMonth && startYear === endYear) {
		return `${format(startDate, 'd', { locale: ru })} ${separator} ${format(endDate, `d ${isShortMonth ? 'LLL' : 'MMMM'} yyyy`, { locale: ru }).replace('.', '')}`
	}
	return `${format(startDate, `d ${isShortMonth ? 'LLL' : 'MMMM'} yyyy`, { locale: ru }).replace('.', '')} ${separator} ${format(endDate, `d ${isShortMonth ? 'LLL' : 'MMMM'} yyyy`, { locale: ru }).replace('.', '')}`
}

export const formatTimeRange = (
	timeArray: [string | null | undefined, string | null | undefined],
): string => {
	const [startTime, endTime] = timeArray
	const isValidTime = (time: string | null | undefined): time is string =>
		time !== null && time !== undefined

	const format = (time: string | null | undefined) =>
		isValidTime(time) ? time.split(':').slice(0, 2).join(':') : undefined

	const formattedStart = format(startTime)
	const formattedEnd = format(endTime)

	if (formattedStart && formattedEnd) {
		return `${formattedStart} - ${formattedEnd}`
	}
	return formattedStart ?? formattedEnd ?? ''
}

export const getDayOfWeek = (date: Date) => {
	return format(date, 'EEEE', { locale: ru })
}

// функция, которая возвращает правильно склонение, в зависимости от числа

export const getCorrectWordForm = (number: number | undefined, wordForms: string[]) => {
	if (!number) return
	const cases = [2, 0, 1, 1, 1, 2]
	const wordIndex =
		number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
	return `${number} ${wordForms[wordIndex]}`
}

// получение названия месяца по индексу

export const getMonthName = (monthIdx: number) => {
	const date = new Date(2024, monthIdx)
	return date.toLocaleString('ru', { month: 'long' })
}

// форматирование даты в строку

export const formatDateToString = (date: Date): string => {
	const year = date.getUTCFullYear()
	const month = String(date.getUTCMonth() + 1).padStart(2, '0')
	const day = String(date.getUTCDate()).padStart(2, '0')
	const hours = String(date.getUTCHours()).padStart(2, '0')
	const minutes = String(date.getUTCMinutes()).padStart(2, '0')
	const seconds = String(date.getUTCSeconds()).padStart(2, '0')
	const timezoneOffset = -date.getTimezoneOffset()
	const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0')
	const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0')
	const sign = timezoneOffset >= 0 ? '+' : '-'

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`
}
