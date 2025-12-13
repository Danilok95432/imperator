import { type ImageItemWithText } from './photos'

export type VideoItem = {
	id: string
	title: string
	duration: string
	url: string | null
	mainphoto: ImageItemWithText[]
	date: Date
	similarVideos: VideoItem[]
	short: string
}
