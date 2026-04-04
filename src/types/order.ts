export type DeliveryOption = {
	id: string
	title: string
	description?: string
	price: number
	days?: string
}

export type PaymentOption = {
	id: string
	title: string
	description?: string
}

export type CartItem = {
	id: string
	title: string
	price: number
	quantity: number
}

export type EditSection = 'region' | 'delivery' | 'payment' | 'customer' | null
