import { type ImageItemWithText } from './photos'

export interface MoreCardItem {
	id: string
	title: string
	item_weight: string
	item_price: string
	img: ImageItemWithText[]
}

export interface CardItem {
	id: string
	images: ImageItemWithText[]
	type?: 'chocolate' | 'candy' | 'set' | 'coctail' | 'special'
	title: string
	artikul: string
	item_weight: string
	item_price: string
	item_desc: string
	short: string
	full: string
	img: ImageItemWithText[]
	moreitems: CardItem[]
	favourite: boolean
	in_cart: boolean
}

export interface IFavotiteItem {
	id: string
	title: string
	weight: string
	price: string
	img: ImageItemWithText[]
}

export interface IFavoriteCatalog {
	items: IFavotiteItem[]
	totalitems: number
}

export interface ICatalog {
	items: CardItem[]
	title: string
	totalitems: number
}

export type SubCatItem = {
	id: string
	title: string
}

export type CatalogListItem = {
	id: string
	title: string
	main_button: string
	img: ImageItemWithText[]
	subcats: SubCatItem[]
}

export interface CatalogListItemsResponse {
	catalogs: CatalogListItem[]
}

export interface CartListItem {
	id_item: string
	item_name: string
	item_count: string
	item_price: string
	item_fullprice: string
}

export interface CartListItemsResponse {
	items: CartListItem[]
	cart_price: string
}
