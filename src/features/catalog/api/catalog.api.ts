import { createApi } from '@reduxjs/toolkit/query/react'
import { type FieldValues } from 'react-hook-form'
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
		addItemToCart: build.mutation<{ status: string; errortext: string }, FieldValues>({
			query: (formData) => {
				const token = localStorage.getItem('token')
				return {
					url: 'cart/add_to_cart',
					headers: token ? { Authorization: `${token}` } : undefined,
					method: 'POST',
					body: formData,
				}
			},
		}),
		deleteItemFromCart: build.query<string, FieldValues>({
			query: (formData) => {
				const token = localStorage.getItem('token')
				return {
					url: 'cart/delete_from_cart',
					headers: token ? { Authorization: `Bearer ${token}` } : undefined,
					method: 'POST',
					body: formData,
				}
			},
		}),
		clearCart: build.mutation<null, null>({
			query: () => ({
				url: `cart/clear`,
			}),
		}),
	}),
})

export const {
	useGetCatalogQuery,
	useGetItemCatalogByIDQuery,
	useGetCategoriesCatalogQuery,
	useGetUserFavoritesQuery,
	useAddItemToCartMutation,
	useDeleteItemFromCartQuery,
	useClearCartMutation,
} = catalogApi
