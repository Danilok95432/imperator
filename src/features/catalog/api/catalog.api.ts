import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from 'src/shared/helpers/base-query'
import { ReducerPath } from 'src/shared/helpers/consts'
import { type CatalogListItemsResponse, type CardItem, type ICatalog } from 'src/types/cardItem'

export const catalogApi = createApi({
	reducerPath: ReducerPath.Catalog,
	tagTypes: ['Catalog'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getCatalog: build.query<ICatalog, { id?: string; limit?: string; step?: string }>({
			query: ({ id, limit, step }) => ({
				url: `catalog/item`,
				params: {
					id,
					limit,
					step,
				},
			}),
		}),
		getItemCatalogByID: build.query<CardItem, string>({
			query: (id) => ({
				url: `catalog/tovar`,
				params: {
					id,
				},
			}),
		}),
		getCategoriesCatalog: build.query<CatalogListItemsResponse, null>({
			query: () => ({
				url: `catalog/list_items`,
			}),
		}),
		getUserFavorites: build.query<ICatalog, null>({
			query: () => {
				const token = localStorage.getItem('token')
				return {
					url: 'user_favourites/list',
					headers: token ? { Authorization: `Bearer ${token}` } : undefined,
				}
			},
		}),
	}),
})

export const {
	useGetCatalogQuery,
	useGetItemCatalogByIDQuery,
	useGetCategoriesCatalogQuery,
	useGetUserFavoritesQuery,
} = catalogApi
