import {
	FormProvider,
	type SubmitHandler,
	useForm,
	type FieldValues,
	useWatch,
} from 'react-hook-form'
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

const getNumber = (value: unknown): number => {
	const numberValue = Number(value)

	return Number.isFinite(numberValue) ? numberValue : 0
}

const getBoolean = (value: unknown): boolean => {
	return value === true || value === 'true' || value === 1 || value === '1'
}

const roundUpToMultiplicity = (value: number, multiplicity: number): number => {
	if (value <= 0 || multiplicity <= 0) return 0

	return Math.ceil(value / multiplicity) * multiplicity
}

const formatPrice = (value: number): string => {
	return `${Math.round(value).toLocaleString('ru-RU')} ₽`
}

export const ChocolateItem = () => {
	const { menuId = '', itemId = '' } = useParams()
	const navigate = useNavigate()
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
		defaultValues: {
			weight: '',
		},
	})

	const weightValue = useWatch({
		control: methods.control,
		name: 'weight',
	})

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

	const isWeightProduct = getBoolean(chocolate?.use_weight)

	const weightOne = getNumber(chocolate?.weight_one)
	const weightPriceKg = getNumber(chocolate?.weight_price_kg)

	const rawWeight = getNumber(weightValue)

	const roundedWeight = isWeightProduct ? roundUpToMultiplicity(rawWeight, weightOne) : 0

	const weightItemsCount =
		isWeightProduct && weightOne > 0 && roundedWeight > 0 ? roundedWeight / weightOne : 0

	const calculatedWeightPrice =
		isWeightProduct && roundedWeight > 0 && weightPriceKg > 0
			? (weightPriceKg / 1000) * roundedWeight
			: 0

	const displayedPrice = isWeightProduct ? calculatedWeightPrice : getNumber(chocolate?.item_price)

	const hasPrice = displayedPrice > 0

	useEffect(() => {
		if (!isNewsItemError) return

		const message = getApiErrorMessage(newsItemError)

		toast.error(message, {
			toastId: `news-error-${menuId}`,
		})

		navigate('/', { replace: true })
	}, [isNewsItemError, newsItemError, navigate, menuId])

	useEffect(() => {
		const nextCartCount = Number(chocolate?.cart_count ?? 0)

		setCartCount(Number.isFinite(nextCartCount) ? Math.max(0, nextCartCount) : 0)

		if (isWeightProduct && nextCartCount > 0) {
			methods.setValue('weight', String(nextCartCount), {
				shouldDirty: false,
				shouldValidate: true,
			})
		}
	}, [chocolate?.cart_count, isWeightProduct, methods])

	useEffect(() => {
		if (!isWeightProduct || weightOne <= 0) return

		const currentWeight = methods.getValues('weight')

		if (currentWeight) return

		methods.setValue('weight', String(weightOne), {
			shouldDirty: false,
			shouldValidate: true,
		})
	}, [isWeightProduct, weightOne, methods])

	useEffect(() => {
		if (!isWeightProduct || weightOne <= 0) return
		if (!weightValue) return

		const timer = window.setTimeout(() => {
			const numericWeight = getNumber(weightValue)

			if (numericWeight <= 0) return

			const nextWeight = roundUpToMultiplicity(numericWeight, weightOne)

			if (nextWeight !== numericWeight) {
				methods.setValue('weight', String(nextWeight), {
					shouldDirty: true,
					shouldValidate: true,
				})
			}
		}, 500)

		return () => {
			window.clearTimeout(timer)
		}
	}, [isWeightProduct, weightOne, weightValue, methods])

	const onSubmit: SubmitHandler<OneItemInputs> = async () => {}

	if (!data || isLoading) return <Loader />

	if (!chocolate) return null

	const hasImages = images.length > 0
	const hasMoreItems = chocolate.moreitems && chocolate.moreitems.length > 0
	const hasWeight = Number(chocolate.item_weight) > 0
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

	const setWeightFieldValue = (value: number) => {
		if (!isWeightProduct) return

		const nextValue = value > 0 ? value : weightOne

		methods.setValue('weight', String(nextValue), {
			shouldDirty: true,
			shouldValidate: true,
		})
	}

	const getCurrentRoundedWeight = () => {
		const currentWeight = getNumber(methods.getValues('weight'))
		const baseWeight = currentWeight > 0 ? currentWeight : weightOne

		return roundUpToMultiplicity(baseWeight, weightOne)
	}

	const handleQuantityCartChange = async (e: MouseEvent, countValue: string) => {
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

	const handleWeightCartChange = async (e: MouseEvent, weightDelta: number) => {
		e.preventDefault()
		e.stopPropagation()

		if (!isWeightProduct || weightOne <= 0) return
		if (isCartUpdating || (weightDelta < 0 && cartCount <= 0)) return

		const updateCart = async () => {
			try {
				setIsCartUpdating(true)

				const response = (await addItemToCart(
					createAddFormData(String(weightDelta)) as unknown as FieldValues,
				).unwrap()) as CartResponse

				if (response?.status === 'error') {
					console.error('Ошибка при изменении товара в корзине:', response.errortext)
					return
				}

				setCartCount((prev) => {
					const responseCount = Number(response?.item_count)

					const nextCount = Number.isFinite(responseCount)
						? Math.max(0, responseCount)
						: Math.max(0, prev + weightDelta)

					setWeightFieldValue(nextCount)

					return nextCount
				})
			} catch (error) {
				console.error('Ошибка при изменении товара в корзине:', error)
			} finally {
				setIsCartUpdating(false)
			}
		}

		if (weightDelta < 0 && cartCount <= weightOne) {
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

	const handleAddWeightToCart = async (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		if (!isWeightProduct || weightOne <= 0 || isCartUpdating) return

		const isValid = await methods.trigger('weight')

		if (!isValid) return

		const currentRoundedWeight = getCurrentRoundedWeight()

		if (currentRoundedWeight <= 0) return

		setWeightFieldValue(currentRoundedWeight)

		await handleWeightCartChange(e, currentRoundedWeight)
	}

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
										<div
											className={styles.desc}
											dangerouslySetInnerHTML={{ __html: chocolate.full }}
										/>
									)}

									{hasComposition && (
										<p className={styles.composition}>{`Состав: ${chocolate.item_desc}`}</p>
									)}

									{isWeightProduct && (
										<FlexRow className={styles.weightRow}>
											<ControlledInput
												className={styles.input}
												name='weight'
												label='Укажите вес'
												isSum
											/>
											<p>{`гр., ${weightItemsCount} шт.`}</p>
										</FlexRow>
									)}
								</FlexRow>

								<FlexRow className={styles.buySection}>
									{hasPrice && <p className={styles.price}>{formatPrice(displayedPrice)}</p>}

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
										{isWeightProduct ? (
											cartCount === 0 ? (
												<p className={styles.btnText} onClick={handleAddWeightToCart}>
													В корзину
												</p>
											) : (
												<FlexRow className={styles.counterCart}>
													<div
														className={styles.vector}
														onClick={async (e: MouseEvent) =>
															await handleWeightCartChange(e, -weightOne)
														}
													>
														<MinusSVG />
													</div>

													<p>{`${cartCount} гр.`}</p>

													<div
														className={styles.vector}
														onClick={async (e: MouseEvent) =>
															await handleWeightCartChange(e, weightOne)
														}
													>
														<PlusSVG />
													</div>
												</FlexRow>
											)
										) : cartCount === 0 ? (
											<p
												className={styles.btnText}
												onClick={async (e: MouseEvent) => await handleQuantityCartChange(e, '1')}
											>
												В корзину
											</p>
										) : (
											<FlexRow className={styles.counterCart}>
												<div
													className={styles.vector}
													onClick={async (e: MouseEvent) => await handleQuantityCartChange(e, '-1')}
												>
													<MinusSVG />
												</div>

												<p>{cartCount}</p>

												<div
													className={styles.vector}
													onClick={async (e: MouseEvent) => await handleQuantityCartChange(e, '1')}
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
