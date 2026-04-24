import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type FieldValues } from 'react-hook-form'
import { MAIN_PROD_URL } from 'src/shared/helpers/consts'
import { type PersonalResponse, type AuthResponse } from 'src/types/auth'
import {
	type SelOption,
	type MultiSelOption,
	type RoleSelOption,
	type SubEventOptions,
} from 'src/types/select'

export const authApi = createApi({
	reducerPath: 'auth/api',
	tagTypes: ['Auth'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		sendRegistrationForm: build.mutation<
			{ status: string; errortext: string; ticket_link: string },
			FieldValues
		>({
			query: (formData) => ({
				url: '/registration/register',
				method: 'POST',
				body: formData,
			}),
		}),
		registrationUser: build.mutation<AuthResponse, FieldValues>({
			query: (formData) => ({
				url: '/registration/register',
				method: 'POST',
				body: formData,
			}),
		}),
		loginUser: build.mutation<AuthResponse, FieldValues>({
			query: (formData) => ({
				url: '/auth/auth',
				method: 'POST',
				body: formData,
			}),
		}),
		logoutUser: build.mutation({
			query: () => {
				const token = localStorage.getItem('token')
				return {
					url: 'auth/logout',
					headers: token ? { Authorization: `Bearer ${token}` } : undefined,
				}
			},
		}),
		getPersonalInfo: build.query<PersonalResponse, null>({
			query: () => {
				const token = localStorage.getItem('token')
				return {
					url: 'user_personal/getinfo',
					headers: token ? { Authorization: `${token}` } : undefined,
				}
			},
		}),
		savePersonalInfo: build.mutation<{ status: string; errortext: string }, FieldValues>({
			query: (formData) => {
				const token = localStorage.getItem('token')
				return {
					url: 'user_personal/saveinfo',
					headers: token ? { Authorization: `${token}` } : undefined,
					method: 'POST',
					body: formData,
				}
			},
		}),
		checkAuth: build.query<AuthResponse, null>({
			query: () => ({
				url: '/auth/refresh',
			}),
		}),
		getRegistrationCode: build.mutation<
			{ status: string; errortext?: string; ticket?: string },
			string
		>({
			query: (phone) => ({
				url: '/registration/getcode',
				method: 'GET',
				params: {
					phone,
				},
			}),
		}),
		checkRegistrationCode: build.mutation<
			{ status: string; errortext: string; ticket_link?: string },
			FieldValues
		>({
			query: (formData) => ({
				url: '/registration/checkcode',
				method: 'POST',
				body: formData,
			}),
		}),
		sendRegistrationGuestForm: build.mutation<
			{ status: string; errortext: string; ticket_link: string },
			FieldValues
		>({
			query: (formData) => ({
				url: '/registration/guest_register',
				method: 'POST',
				body: formData,
			}),
		}),
		getRegionsByValue: build.query<{ regions: SelOption[] }, string>({
			query: (value) => ({
				url: '/registration/getregions',
				method: 'GET',
				params: {
					value,
				},
			}),
		}),
		getCityByRegion: build.query<{ citys: SelOption[] }, { region: string; city: string }>({
			query: ({ region, city }) => ({
				url: '/registration/getcitys',
				method: 'GET',
				params: {
					region,
					city,
				},
			}),
		}),
		getInfoRegistation: build.query<
			{
				car_types: SelOption[]
				lager_types: SelOption[]
				dates: SelOption[]
				guest_group_types?: SelOption[]
				etnosport?: MultiSelOption[]
				zabavy?: MultiSelOption[]
				event_roles?: RoleSelOption[]
				sub_events?: SubEventOptions[]
			},
			string
		>({
			query: (idEvent) => ({
				url: '/registration/getinfo',
				method: 'GET',
				params: {
					id_event: idEvent,
				},
			}),
		}),
	}),
})
export const {
	useLoginUserMutation,
	useGetRegistrationCodeMutation,
	useGetRegionsByValueQuery,
	useGetCityByRegionQuery,
	useGetInfoRegistationQuery,
	useSendRegistrationGuestFormMutation,
	useSendRegistrationFormMutation,
	useLogoutUserMutation,
	useCheckRegistrationCodeMutation,
	useCheckAuthQuery,
	useRegistrationUserMutation,
	useGetPersonalInfoQuery,
	useSavePersonalInfoMutation,
} = authApi
