export enum ReducerPath {
	Home = 'home/api',
	Content = 'content/api',
	About = 'about/api',
	Objects = 'objects/api',
	News = 'news/api',
	Events = 'events/api',
	Cultures = 'cultures/api',
	Tradition = 'traditions/api',
	Games = 'games/api',
	Videos = 'videos/api',
	Search = 'search/api',
	Vids = 'vids/api',
	Heroes = 'heroes/api',
	Cicles = 'cicles/api',
}

export const ImagesFormat = ['png', 'jpeg', 'jpg', 'webp', 'gif']
export enum NameSpace {
	Modal = 'MODAL',
}

export enum DisplayBreakpoints {
	Xss = 340,
	Xs = 500,
	Sm = 576,
	Md = 768,
	ShortLg = 800,
	Lg = 1024,
	Xl = 1280,
	Xll = 1400,
	Xxl = 1440,
	Fhd = 1920,
}

export const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4020/api/v1' // express js сервер
export const PROD_URL = '/api' // для локальной разработки
export const MAIN_PROD_URL = 'https://etnosportapi.npotau.ru' // для выкладки на vercel
