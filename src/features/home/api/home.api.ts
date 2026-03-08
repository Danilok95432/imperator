import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_PROD_URL, ReducerPath } from 'src/shared/helpers/consts'

export const homeApi = createApi({
	reducerPath: ReducerPath.Home,
	tagTypes: ['Home'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getFaqById: build.query<null, string>({
			query: (idEvent) => ({
				url: `home/faq`,
				params: {
					id_event: idEvent,
				},
			}),
		}),
	}),
})

export const { useGetFaqByIdQuery } = homeApi
