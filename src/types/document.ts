export type FileLinksItem = {
	id: string
	type: string
	size: string
}

export type Document = {
	id: string
	title: string
	isMain?: boolean

	description?: string
	version?: string
	date: string
	author: string
	fileLinks: FileLinksItem[]
}

export type ShortDocument = {
	id: string
	title: string
	link: string
	type?: 'doc' | 'pdf'
	size?: string
}
