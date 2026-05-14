import { createApi } from '@reduxjs/toolkit/query/react'
import { type FieldValues } from 'react-hook-form'
import { baseQueryWithReauth } from 'src/shared/helpers/base-query'
import { ReducerPath } from 'src/shared/helpers/consts'
import {
	type CatalogListItemsResponse,
	type CardItem,
	type ICatalog,
	type CartListItemsResponse,
} from 'src/types/cardItem'

export const catalogApi = createApi({
	reducerPath: ReducerPath.Catalog,
	tagTypes: ['Catalog'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getCatalog: build.query<
			ICatalog,
			{ id?: string; limit?: string; step?: string; userId?: string }
		>({
			query: ({ id, limit, step, userId }) => ({
				url: `catalog/item`,
				params: {
					id,
					limit,
					step,
					id_user: userId,
				},
			}),
		}),
		getItemCatalogByID: build.query<CardItem, { id: string; userId?: string }>({
			query: ({ id, userId }) => ({
				url: `catalog/tovar`,
				params: {
					id,
					id_user: userId,
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
		getItemsCart: build.query<CartListItemsResponse, string>({
			query: (idUser) => {
				const token = localStorage.getItem('token')
				return {
					url: 'cart/list',
					headers: token ? { Authorization: `${token}` } : undefined,
					params: {
						id_user: idUser,
					},
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
		deleteItemFromCart: build.mutation<string, FieldValues>({
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
		clearCart: build.mutation<null, FieldValues>({
			query: (formData) => {
				const token = localStorage.getItem('token')
				return {
					url: `cart/clear`,
					headers: token ? { Authorization: `Bearer ${token}` } : undefined,
					method: 'POST',
					body: formData,
				}
			},
		}),
		addToFavorites: build.mutation<{ status: string; errortext: string }, FieldValues>({
			query: (formData) => {
				const token = localStorage.getItem('token')
				return {
					url: 'favourite/add',
					headers: token ? { Authorization: `${token}` } : undefined,
					method: 'POST',
					body: formData,
				}
			},
		}),
		deleteFromFavorites: build.mutation<{ status: string; errortext: string }, FieldValues>({
			query: (formData) => {
				const token = localStorage.getItem('token')
				return {
					url: 'favourite/delete',
					headers: token ? { Authorization: `${token}` } : undefined,
					method: 'POST',
					body: formData,
				}
			},
		}),
		getItemsFavorites: build.query<ICatalog, string>({
			query: (idUser) => {
				const token = localStorage.getItem('token')
				return {
					url: 'favourite/list',
					headers: token ? { Authorization: `Bearer ${token}` } : undefined,
					params: {
						id_user: idUser,
					},
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
	useAddItemToCartMutation,
	useDeleteItemFromCartMutation,
	useClearCartMutation,
	useGetItemsCartQuery,
	useAddToFavoritesMutation,
	useDeleteFromFavoritesMutation,
	useGetItemsFavoritesQuery,
} = catalogApi
