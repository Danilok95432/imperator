import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from 'src/shared/helpers/base-query'
import { ReducerPath } from 'src/shared/helpers/consts'
import { type SettingsResponse } from 'src/types/settings'

export const settingsApi = createApi({
	reducerPath: ReducerPath.Settings,
	tagTypes: ['Settings'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getSiteSettings: build.query<SettingsResponse, null>({
			query: () => ({
				url: `sitesettings/getinfo`,
			}),
		}),
	}),
})

export const { useGetSiteSettingsQuery } = settingsApi
