import { configureStore } from '@reduxjs/toolkit'
import { modalReducer } from 'src/features/modal/store/modal.slice'
import { NameSpace } from 'src/shared/helpers/consts'
import { breadCrumbsReducer } from 'src/widgets/breadcrumbs/store/bread-crumbs.slice'

export const store = configureStore({
	reducer: {
		[NameSpace.Modal]: modalReducer,
		[NameSpace.BreadCrumbs]: breadCrumbsReducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
