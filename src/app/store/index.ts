import { configureStore } from '@reduxjs/toolkit'
import { authApi } from 'src/features/auth/api/auth.api'
import { homeApi } from 'src/features/home/api/home.api'
import { modalReducer } from 'src/features/modal/store/modal.slice'
import { NameSpace } from 'src/shared/helpers/consts'

export const store = configureStore({
	reducer: {
		[NameSpace.Modal]: modalReducer,
		[homeApi.reducerPath]: homeApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			homeApi.middleware,
			authApi.middleware,
		),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
