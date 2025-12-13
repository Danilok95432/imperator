import { type CategoryFilterItem } from './global'
import { type ImageItem, type ImageItemWithText } from './photos'

export type NewsItem = {
	id: string
	title: string
	date: Date
	imgGallery: ImageItem[]
	mainphoto: ImageItemWithText[]
	textNews: string[]
	full: string
	short: string
	main: boolean
}

export type CardNewsItem = {
	id: string
	title: string
	mainphoto: ImageItemWithText[]
	date: Date
	desc: string
	main: boolean
	category: CategoryFilterItem
}
