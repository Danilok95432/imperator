export enum ReducerPath {
	Home = 'home/api',
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

export const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4020/api/v1'
export const PROD_URL = '/api'
export const MAIN_PROD_URL = ''
