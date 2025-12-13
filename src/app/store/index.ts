import { configureStore } from '@reduxjs/toolkit'
import { modalReducer } from 'src/features/modal/store/modal.slice'
import { NameSpace } from 'src/shared/helpers/consts'

export const store = configureStore({
	reducer: {
		[NameSpace.Modal]: modalReducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
