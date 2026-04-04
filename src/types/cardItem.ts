export interface CardItem {
	id: string
	price: number
	title: string
	weight: number
	category: string
	additives?: string[]
	img: string
	images: string[]
	composition: string
	description: string
	type?: 'chocolate' | 'candy' | 'set' | 'coctail' | 'special'
}
