import { type ReactNode } from 'react'
import { type ImageItemWithText } from './photos'

export type LinkItem = {
	id: string
	link: string
	titleLink: string
	type?: 'doc' | 'pdf'
	label?: ReactNode | ReactNode[]
}

export type SimpleLinkType = {
	id: string
	title: string
	link: string
	mainphoto: ImageItemWithText[]
}

export type SourceLink = {
	id: string
	title: string
	link: string
	date: Date
	source: string
}

export type MonthFilterItem = {
	date: Date
	isActive: boolean
}
export type CategoryFilterItem = {
	id: string
	title: string
}

export type FiltrationInfo = {
	months: MonthFilterItem[]
	categories: CategoryFilterItem[]
	brands: CategoryFilterItem[]
}
