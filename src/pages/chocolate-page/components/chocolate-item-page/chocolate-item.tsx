import { FormProvider, type SubmitHandler, useForm, type FieldValues } from 'react-hook-form'
import { type MouseEvent, type RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import cn from 'classnames'

import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Section } from 'src/shared/ui/Section/section'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { MinusSVG } from 'src/shared/ui/icons/minusSvg'
import { PlusSVG } from 'src/shared/ui/icons/plusSVG'

import { BreadCrumbs } from 'src/widgets/breadcrumbs/bread-crumbs'
import { SliderBtns } from 'src/widgets/Slider-btns/slider-btns'
import { ChocolateCard } from '../chocolate-list/components/chocolate-card/chocolate-card'

import { useAdditionalCrumbs } from 'src/app/store/hooks/additionalCrumbs'
import {
	useAddItemToCartMutation,
	useGetCatalogQuery,
	useGetItemCatalogByIDQuery,
} from 'src/features/catalog/api/catalog.api'

import { sliderOptions } from './consts'
import styles from './index.module.scss'

import 'swiper/css'
import 'swiper/css/pagination'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { toast } from 'react-toastify'
import { useActions } from 'src/app/store/hooks/actions'
import { ConfirmWindow } from 'src/modals/confirmActionModal/confirmActionModal'
import { Loader } from 'src/shared/ui/loader/loader'
import { FullscreenGallery } from 'src/widgets/fullscreen-gallery/fullscreen-gallery'
import { ControlledInput } from 'src/widgets/controlled-input/controlled-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { type OneItemInputs, oneItemInputsSchema } from './schema'

type CartResponse = {
	item_count?: string
	status: string
	errortext?: string
}

type ApiErrorResponse = {
	status: 'error'
	error: string
}

const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
	return typeof error === 'object' && error !== null && 'status' in error
}

const getApiErrorMessage = (error: unknown): string => {
	if (isFetchBaseQueryError(error)) {
		const errorData = error.data as Partial<ApiErrorResponse> | undefined

		if (errorData?.status === 'error' && errorData?.error) {
			return errorData.error
		}
	}

	return 'Произошла ошибка при загрузке категории'
}

export const ChocolateItem = () => {
	const { menuId = '', itemId = '' } = useParams()
	const userID = localStorage.getItem('userID') ?? ''

	const {
		data,
		error: newsItemError,
		isLoading,
		isError: isNewsItemError,
	} = useGetItemCatalogByIDQuery({
		id: itemId,
		userId: userID,
	})

	const { data: catalogData } = useGetCatalogQuery({
		id: menuId,
		limit: '0',
		step: '1',
		userId: userID,
	})

	const methods = useForm<OneItemInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneItemInputsSchema),
	})

	const onSubmit: SubmitHandler<OneItemInputs> = async (data) => {
		const formData = new FormData()
		formData.append('weight', data.weight)
	}

	const ves = true

	const navigate = useNavigate()

	useEffect(() => {
		if (!isNewsItemError) return

		const message = getApiErrorMessage(newsItemError)

		toast.error(message, {
			toastId: `news-error-${menuId}`,
		})

		navigate('/', { replace: true })
	}, [isNewsItemError, newsItemError, navigate, menuId])

	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	const chocolate = data

	useAdditionalCrumbs(chocolate?.title)

	const { openModal } = useActions()

	const [addItemToCart] = useAddItemToCartMutation()

	const [cartCount, setCartCount] = useState<number>(0)
	const [isCartUpdating, setIsCartUpdating] = useState<boolean>(false)
	const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
	const [fullscreenInitialSlide, setFullscreenInitialSlide] = useState(0)

	const images = useMemo(() => {
		return [...(chocolate?.images?.filter((image) => Boolean(image?.original)) ?? [])].reverse()
	}, [chocolate?.images])

	useEffect(() => {
		setCartCount(Number(chocolate?.cart_count ?? 0))
	}, [chocolate?.cart_count])

	if (!data || isLoading) return <Loader />

	if (!chocolate) return null
	const hasImages = images.length > 0
	const hasMoreItems = chocolate.moreitems && chocolate.moreitems.length > 0
	const hasWeight = Number(chocolate.item_weight) > 0
	const hasPrice = Number(chocolate.item_price) > 0
	const hasFull = Boolean(chocolate.full)
	const hasComposition = Boolean(chocolate.item_desc)

	const openFullscreen = (index: number) => {
		setFullscreenInitialSlide(index)
		setIsFullscreenOpen(true)
	}

	const createAddFormData = (count: string) => {
		const formData = new FormData()

		if (userID) {
			formData.append('id_user', userID)
		}

		formData.append('id_item', itemId)
		formData.append('item_count', count)

		return formData
	}

	const handleAddToCart = async (e: MouseEvent, countValue: string) => {
		e.preventDefault()
		e.stopPropagation()

		const delta = Number(countValue)

		if (isCartUpdating || (delta < 0 && cartCount <= 0)) return

		const updateCart = async () => {
			try {
				setIsCartUpdating(true)

				const response = (await addItemToCart(
					createAddFormData(countValue) as unknown as FieldValues,
				).unwrap()) as CartResponse

				if (response?.status === 'error') {
					console.error('Ошибка при изменении товара в корзине:', response.errortext)
					return
				}

				setCartCount((prev) => {
					const nextCount = Number(response?.item_count)

					if (Number.isFinite(nextCount)) {
						return Math.max(0, nextCount)
					}

					return Math.max(0, prev + delta)
				})
			} catch (error) {
				console.error('Ошибка при изменении товара в корзине:', error)
			} finally {
				setIsCartUpdating(false)
			}
		}

		if (delta < 0 && cartCount === 1) {
			openModal(
				<ConfirmWindow
					text='Вы действительно хотите удалить товар из корзины? Отменить это действие будет нельзя'
					submitHandle={updateCart}
					link={`/catalog/${menuId}/item/${itemId}`}
				/>,
			)

			return
		}

		await updateCart()
	}

	if (!data || isLoading) return <Loader />
	return (
		<Section className={styles.chocolatePage}>
			<FormProvider {...methods}>
				<form
					className={styles.form}
					onSubmit={methods.handleSubmit(onSubmit)}
					noValidate
					autoComplete='off'
				>
					<Container className={styles.cont}>
						<FlexRow className={styles.headRow}>
							<BreadCrumbs
								crumbsLinksMap={[
									{
										title: catalogData?.title ?? 'Шоколад',
										link: 'catalog',
									},
								]}
								isCatalog
								idLink={menuId}
							/>
						</FlexRow>

						<FlexRow className={styles.previewProduct}>
							{hasImages && (
								<FlexRow className={styles.slider}>
									<Swiper
										{...sliderOptions}
										ref={swiperRef}
										className={styles.sliderMain}
										modules={[Pagination]}
										pagination={{ clickable: true }}
									>
										{images.map((slideEl, idx) => {
											return (
												<SwiperSlide key={`${slideEl.original}-${idx}`}>
													<FlexRow className={styles.slideRow}>
														<button
															type='button'
															className={styles.imgWrapper}
															onClick={() => openFullscreen(idx)}
															aria-label='Открыть изображение в полноэкранном режиме'
														>
															<img
																className={styles.sliderImg}
																src={slideEl.original}
																alt={chocolate.title ?? 'image'}
															/>
														</button>
													</FlexRow>
												</SwiperSlide>
											)
										})}
									</Swiper>

									{images.length > 1 && (
										<SliderBtns className={styles.sliderBtns} swiperRef={swiperRef} />
									)}
								</FlexRow>
							)}

							{!hasImages && <div className={styles.noSlider}></div>}

							<FlexRow className={styles.infoWrapper}>
								<FlexRow className={styles.info}>
									{chocolate.title && <p className={styles.title}>{chocolate.title}</p>}

									{hasWeight && <p className={styles.weight}>{`${chocolate.item_weight} гр.`}</p>}

									{hasFull && (
										<p className={styles.desc}>
											{chocolate?.full && (
												<div
													className={styles.desc}
													dangerouslySetInnerHTML={{ __html: chocolate?.full }}
												/>
											)}
										</p>
									)}

									{hasComposition && (
										<p className={styles.composition}>{`Состав: ${chocolate.item_desc}`}</p>
									)}

									{ves && (
										<FlexRow className={styles.weightRow}>
											<ControlledInput className={styles.input} name='weight' label='Укажите вес' />
											<p>гр., 6 шт.</p>
										</FlexRow>
									)}
								</FlexRow>

								<FlexRow className={styles.buySection}>
									{hasPrice && <p className={styles.price}>{`${chocolate.item_price} ₽`}</p>}

									<MainButton
										type='button'
										className={cn(styles.buyButton, {
											[styles.filled]: cartCount > 0,
											[styles.loading]: isCartUpdating,
										})}
										disabled={isCartUpdating}
										onClick={(e: MouseEvent) => {
											e.preventDefault()
											e.stopPropagation()
										}}
									>
										{cartCount === 0 ? (
											<p
												className={styles.btnText}
												onClick={async (e: MouseEvent) => await handleAddToCart(e, '1')}
											>
												В корзину
											</p>
										) : (
											<FlexRow className={styles.counterCart}>
												<div
													className={styles.vector}
													onClick={async (e: MouseEvent) => await handleAddToCart(e, '-1')}
												>
													<MinusSVG />
												</div>

												<p>{cartCount}</p>

												<div
													className={styles.vector}
													onClick={async (e: MouseEvent) => await handleAddToCart(e, '1')}
												>
													<PlusSVG />
												</div>
											</FlexRow>
										)}
									</MainButton>
								</FlexRow>
							</FlexRow>
						</FlexRow>

						{hasMoreItems && (
							<FlexRow className={styles.alsoItems}>
								<p className={styles.subtitle}>Попробуйте также</p>

								<div className={styles.alsoList}>
									{chocolate.moreitems.map((el) => {
										return (
											<ChocolateCard
												key={el.id}
												chocolate={el}
												className={styles.alsoCard}
												smallCard
											/>
										)
									})}
								</div>
							</FlexRow>
						)}
					</Container>
					{isFullscreenOpen && (
						<FullscreenGallery
							images={images}
							initialSlide={fullscreenInitialSlide}
							title={chocolate.title ?? 'Изображение товара'}
							onClose={() => setIsFullscreenOpen(false)}
						/>
					)}
				</form>
			</FormProvider>
		</Section>
	)
}
