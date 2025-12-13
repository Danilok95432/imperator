import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_PROD_URL, ReducerPath } from 'src/shared/helpers/consts'
import { type NewsItem } from 'src/types/news'
import { type VideoItem } from 'src/types/videos'

export const contentApi = createApi({
	reducerPath: ReducerPath.Content,
	tagTypes: ['Content'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getNewsById: build.query<NewsItem, string>({
			query: (newsId) => ({
				url: `news/${newsId}`,
			}),
		}),
		getVideoById: build.query<VideoItem, string>({
			query: (videoId) => ({
				url: `videos/${videoId}`,
			}),
		}),
	}),
})

export const { useGetNewsByIdQuery, useGetVideoByIdQuery } = contentApi
