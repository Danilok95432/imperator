export type DeliveryOption = {
	id?: string
	title?: string
	value: string
	label: string
	description?: string
	address?: string
	price?: string | number
	days?: string
}

export type PaymentOption = {
	id?: string
	value: string
	label: string
	description?: string
}

export type CartItem = {
	id: string
	title: string
	price: number
	quantity: number
}

export type OrderItem = {
	id: string
	number: string
	date: string
	items: CartItem[]
	deliveryPrice: string
	totalPrice: string
	itemsTotal: string
	deliver: string
	status: string
	deliverDate: string
	type: 'current' | 'completed' | 'canceled'
}

export type EditSection = 'region' | 'delivery' | 'payment' | 'customer' | null
