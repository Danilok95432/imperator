export type RegistrationParticipant = {
	surname: string
	firstname: string
	fathname: string
	age: string
	birthdate: string
	id_region: string
	id_city: string
	email: string
	phone: string
	id_reg_type: string
	id_event: string
	use_group: boolean
	group_name: string
	id_group_type: string
	group_count: string
	group_list: GuestGroupList[]
	use_lager: boolean
	lager_count: string
	data_zaezd: string
	data_viezd: string
	use_sportsmen: boolean
	use_folk: boolean
	use_trader: boolean
	use_master: boolean
	use_org: boolean
	use_volunteer: boolean
	master_name: string
	use_journalist: boolean
	journal_name: string
	use_car: boolean
	id_car_type: string
	car_number: string
}

export type RegistrationGuest = {
	surname: string
	firstname: string
	fathname: string
	age: string
	id_region: string
	id_city: string
	phone: string
	email: string
	use_group: boolean
	group_name: string
	id_group_type: string
	group_count: string
	group_list: GuestGroupList[]
	use_car: boolean
	cars_count: string
	cars_list: GuestCarsList[]
	use_lager: boolean
	id_lager_type: string
	lager_count: string
	date_zaezd: string
	date_viezd: string
}

export type GuestGroupList = {
	age: string
	surname: string
	firstname: string
	fathname?: string | null
}

export type GuestCarsList = {
	car_type: string
	car_number: string
}
