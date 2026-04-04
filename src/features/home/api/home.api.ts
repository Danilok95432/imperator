import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from 'src/shared/helpers/base-query'
import { ReducerPath } from 'src/shared/helpers/consts'
import { type SliderListResponse, type AwardsListResponse } from 'src/types/home'

export const homeApi = createApi({
	reducerPath: ReducerPath.Home,
	tagTypes: ['Home'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getFaqById: build.query<null, string>({
			query: (idEvent) => ({
				url: `home/faq`,
				params: {
					id_event: idEvent,
				},
			}),
		}),
		getAwardsList: build.query<AwardsListResponse, null>({
			query: () => ({
				url: `awards/list`,
			}),
		}),
		getSliderList: build.query<SliderListResponse, null>({
			query: () => ({
				url: `slider/list`,
			}),
		}),
	}),
})

export const { useGetFaqByIdQuery, useGetAwardsListQuery, useGetSliderListQuery } = homeApi
