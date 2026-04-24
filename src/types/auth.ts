export type User = {
	id: string
	email: string
	username: string
}

export type LoginData = {
	username: string
	password: string
}

export type AuthResponse = {
	token: string
	user: User
	status: string
}

export type PersonalResponse = {
	firstname: string
	surname: string
	email: string
	telphone: string
	use_spam: boolean
}
