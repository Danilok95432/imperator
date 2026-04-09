import { type ImageItemWithText } from './photos'

export type AwardsItem = {
	id: string
	img: ImageItemWithText[]
	itemdesc: string
	itemname: string
	title: string
	use_main: boolean
}

export type AwardsListResponse = {
	awards: AwardsItem[]
}

export type SliderItem = {
	id: string
	img: ImageItemWithText[]
	itemlink: string
	title: string
	itemdesc: string
	use_main: boolean
}

export type SliderListResponse = {
	slider: SliderItem[]
}

export type ReviewItem = {
	id: string
	name: string
	rating: string
	role: string
	comment: string
	date: string
}

export type ReviewListResponse = {
	reviews: ReviewItem[]
}

export type BestItem = {
	id: string
	title: string
	weight: string
	price: string
	img: ImageItemWithText[]
}

export type BestListResponse = {
	best: BestItem[]
}

export type EliteItem = {
	id: string
	title: string
}

export type EliteListResponse = {
	elits: EliteItem[]
}
