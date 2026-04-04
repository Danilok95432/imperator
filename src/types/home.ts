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
