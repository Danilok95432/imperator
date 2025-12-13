import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_PROD_URL, ReducerPath } from 'src/shared/helpers/consts'
import {
	type CardEventItem,
	type EventItem,
	type EventAwardResponse,
	type EventFaq,
} from 'src/types/event'
import { type CardNewsItem } from 'src/types/news'
import { type ProgramDay, type SubEventResponse } from 'src/types/program'
import { type VideoItem } from 'src/types/videos'

export const homeApi = createApi({
	reducerPath: ReducerPath.Home,
	tagTypes: ['Home'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getEventsMonths: build.query<CardEventItem[], { date: string; category: string }>({
			query: ({ date = '0', category = '0' }) => ({
				url: 'events',
				params: {
					d: date,
					cat: category,
				},
			}),
		}),
		getEventById: build.query<EventItem, string>({
			query: (eventId) => ({
				url: `events/${eventId}`,
			}),
		}),
		getEventNewsById: build.query<CardNewsItem[], string>({
			query: (eventId) => ({
				url: `news`,
				params: {
					id_event: eventId,
				},
			}),
		}),
		getEventAwardsById: build.query<EventAwardResponse, string>({
			query: (eventId) => ({
				url: `dates/list`,
				params: {
					id_event: eventId,
				},
			}),
		}),
		getEventVideosById: build.query<VideoItem[], string>({
			query: (eventId) => ({
				url: `videos`,
				params: {
					id_event: eventId,
				},
			}),
		}),
		getEventProgramById: build.query<ProgramDay[], string>({
			query: (eventId) => ({
				url: `events/program`,
				params: {
					id_event: eventId,
				},
			}),
		}),
		getSubEventProgramById: build.query<SubEventResponse, string>({
			query: (subEventId) => ({
				url: `sub_events/${subEventId}`,
			}),
		}),
		getFaqById: build.query<EventFaq[], string>({
			query: (idEvent) => ({
				url: `home/faq`,
				params: {
					id_event: idEvent,
				},
			}),
		}),
	}),
})

export const {
	useGetEventsMonthsQuery,
	useGetEventByIdQuery,
	useGetEventAwardsByIdQuery,
	useGetEventNewsByIdQuery,
	useGetEventProgramByIdQuery,
	useGetEventVideosByIdQuery,
	useGetSubEventProgramByIdQuery,
	useGetFaqByIdQuery,
} = homeApi
