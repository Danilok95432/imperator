import { useMemo, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useWatch, useForm, type SubmitHandler } from 'react-hook-form'

import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { ControlledInput } from 'src/widgets/controlled-input/controlled-input'

import styles from './index.module.scss'
import { orderInputsSchema, type OrderInputs } from './schema'
import { cartItemsMock, deliveryOptions, paymentOptions } from 'src/mock/order'
import { type EditSection } from 'src/types/order'
import { DeliveryCard } from './components/delivery-card/delivery-card'
import { OrderStep } from './components/order-step/order-step'
import { OrderSummary } from './components/order-summary/order-summary'
import { PaymentCard } from './components/payment-card/payment-card'

export const CartPage = () => {
	const methods = useForm<OrderInputs>({
		mode: 'onBlur',
		resolver: yupResolver(orderInputsSchema),
		defaultValues: {
			city: '',
			deliveryId: '',
			paymentId: '',
			name: '',
			secondName: '',
			email: '',
			phone: '',
			street: '',
			house: '',
			apartment: '',
			comment: '',
		},
	})

	const {
		handleSubmit,
		setValue,
		trigger,
		getValues,
		formState: { errors },
	} = methods

	const [editingSection, setEditingSection] = useState<EditSection>('region')

	const values = useWatch({ control: methods.control })

	const itemsTotal = useMemo(() => {
		return cartItemsMock.reduce((acc, item) => acc + item.price * item.quantity, 0)
	}, [])

	const selectedDelivery = deliveryOptions.find((item) => item.id === values.deliveryId)
	const selectedPayment = paymentOptions.find((item) => item.id === values.paymentId)
	const deliveryPrice = selectedDelivery?.price ?? 0
	const totalPrice = itemsTotal + deliveryPrice

	const isRegionFilled = Boolean(values.city?.trim())
	const isDeliveryFilled = Boolean(values.deliveryId)
	const isPaymentFilled = Boolean(values.paymentId)

	const isCustomerFilled =
		Boolean(values.name?.trim()) &&
		Boolean(values.secondName?.trim()) &&
		Boolean(values.email?.trim()) &&
		Boolean(values.phone?.trim()) &&
		Boolean(values.street?.trim()) &&
		Boolean(values.house?.trim()) &&
		Boolean(values.apartment?.trim()) &&
		!errors.name &&
		!errors.secondName &&
		!errors.email &&
		!errors.phone &&
		!errors.street &&
		!errors.house &&
		!errors.apartment

	const isOrderReady = isRegionFilled && isDeliveryFilled && isPaymentFilled && isCustomerFilled

	const onSubmit: SubmitHandler<OrderInputs> = async (data) => {
		console.log(data)
	}

	const handleSaveRegion = async () => {
		const valid = await trigger('city')
		if (!valid) return
		setEditingSection('delivery')
	}

	const handleSaveDelivery = async () => {
		const valid = await trigger('deliveryId')
		if (!valid) return
		setEditingSection('payment')
	}

	const handleSavePayment = async () => {
		const valid = await trigger('paymentId')
		if (!valid) return
		setEditingSection('customer')
	}

	const handleSaveCustomer = async () => {
		const valid = await trigger([
			'name',
			'secondName',
			'email',
			'phone',
			'street',
			'house',
			'apartment',
			'comment',
		])

		if (!valid) return
		setEditingSection(null)
	}

	return (
		<Section className={styles.section}>
			<Container className={styles.cont}>
				<h1 className={styles.title}>Оформление заказа</h1>

				<FormProvider {...methods}>
					<form
						className={styles.layout}
						onSubmit={handleSubmit(onSubmit)}
						noValidate
						autoComplete='off'
					>
						<div className={styles.main}>
							<OrderStep
								title='1. Регион доставки'
								isEditing={editingSection === 'region'}
								canEdit={true}
								onEdit={() => setEditingSection('region')}
							>
								{editingSection === 'region' ? (
									<div className={styles.stepContent}>
										<ControlledInput name='city' label='Город доставки*' margin='0 0 24px 0' />

										<FlexRow className={styles.actionsRow}>
											<MainButton
												type='button'
												onClick={handleSaveRegion}
												className={styles.enterBtn}
											>
												Далее
											</MainButton>
										</FlexRow>
									</div>
								) : (
									<div className={styles.summaryText}>Город доставки: {getValues('city')}</div>
								)}
							</OrderStep>

							{isRegionFilled && (
								<OrderStep
									title='2. Доставка'
									isEditing={editingSection === 'delivery'}
									canEdit={isDeliveryFilled}
									onEdit={() => setEditingSection('delivery')}
								>
									{editingSection === 'delivery' ? (
										<div className={styles.stepContent}>
											<div className={styles.cards}>
												{deliveryOptions.map((option) => (
													<DeliveryCard
														key={option.id}
														option={option}
														active={values.deliveryId === option.id}
														onClick={() =>
															setValue('deliveryId', option.id, {
																shouldValidate: true,
																shouldDirty: true,
															})
														}
													/>
												))}
											</div>

											<FlexRow className={styles.actionsBetween}>
												<MainButton
													type='button'
													onClick={() => setEditingSection('region')}
													className={styles.backBtn}
												>
													Назад
												</MainButton>

												<MainButton
													type='button'
													onClick={handleSaveDelivery}
													className={styles.enterBtn}
												>
													Далее
												</MainButton>
											</FlexRow>
										</div>
									) : (
										<DeliveryCard
											key={selectedDelivery?.id}
											option={
												selectedDelivery ?? {
													id: '',
													title: '',
													description: '',
													price: 1,
													days: '',
												}
											}
											active={values.deliveryId === selectedDelivery?.id}
											onClick={() =>
												setValue('deliveryId', selectedDelivery?.id ?? '', {
													shouldValidate: true,
													shouldDirty: true,
												})
											}
										/>
									)}
								</OrderStep>
							)}

							{true && (
								<OrderStep
									title='3. Оплата'
									isEditing={editingSection === 'payment'}
									canEdit={true}
									onEdit={() => setEditingSection('payment')}
								>
									{editingSection === 'payment' ? (
										<div className={styles.stepContent}>
											<div className={styles.cards}>
												{paymentOptions.map((option) => (
													<PaymentCard
														key={option.id}
														option={option}
														active={values.paymentId === option.id}
														onClick={() =>
															setValue('paymentId', option.id, {
																shouldValidate: true,
																shouldDirty: true,
															})
														}
													/>
												))}
											</div>

											<FlexRow className={styles.actionsBetween}>
												<MainButton
													type='button'
													onClick={() => setEditingSection('delivery')}
													className={styles.backBtn}
												>
													Назад
												</MainButton>

												<MainButton
													type='button'
													onClick={handleSavePayment}
													className={styles.enterBtn}
												>
													Далее
												</MainButton>
											</FlexRow>
										</div>
									) : selectedPayment ? (
										<PaymentCard
											key={selectedPayment.id}
											option={selectedPayment}
											active={values.paymentId === selectedPayment.id}
											onClick={() =>
												setValue('paymentId', selectedPayment.id, {
													shouldValidate: true,
													shouldDirty: true,
												})
											}
										/>
									) : null}
								</OrderStep>
							)}

							{true && (
								<OrderStep
									title='4. Покупатель'
									isEditing={editingSection === 'customer'}
									canEdit={true}
									onEdit={() => setEditingSection('customer')}
								>
									{editingSection === 'customer' ? (
										<div className={styles.stepContent}>
											<FlexRow className={styles.formRow}>
												<ControlledInput
													name='name'
													label='Имя*'
													margin='0'
													className={styles.input}
												/>
												<ControlledInput
													name='secondName'
													label='Фамилия*'
													margin='0'
													className={styles.input}
												/>
												<ControlledInput
													name='email'
													label='Email*'
													margin='0'
													className={styles.input}
												/>
												<ControlledInput
													name='phone'
													label='Телефон*'
													margin='0'
													className={styles.input}
													isPhone
												/>
												<ControlledInput
													name='street'
													label='Улица*'
													margin='0'
													className={styles.input}
												/>
												<ControlledInput
													name='house'
													label='Дом*'
													margin='0'
													className={styles.input}
												/>
												<ControlledInput
													name='apartment'
													label='Квартира / офис*'
													margin='0'
													className={styles.input}
												/>
												<ControlledInput
													name='comment'
													label='Комментарий к заказу'
													margin='0'
													isTextarea
													height='200px'
													className={styles.input}
												/>
											</FlexRow>

											<FlexRow className={styles.actionsBetween}>
												<MainButton
													type='button'
													onClick={() => setEditingSection('payment')}
													className={styles.backBtn}
												>
													Назад
												</MainButton>

												<MainButton
													type='button'
													onClick={handleSaveCustomer}
													className={styles.enterBtn}
												>
													Далее
												</MainButton>
											</FlexRow>
										</div>
									) : isCustomerFilled ? (
										<div className={styles.customerSummary}>
											<div>Имя: {getValues('name')}</div>
											<div>Фамилия: {getValues('secondName')}</div>
											<div>E-mail: {getValues('email')}</div>
											<div>Телефон: {getValues('phone')}</div>
											<div>Улица: {getValues('street')}</div>
											<div>Дом: {getValues('house')}</div>
											<div>Квартира (офис): {getValues('apartment')}</div>
											{getValues('comment') && <div>Комментарий: {getValues('comment')}</div>}
										</div>
									) : null}
								</OrderStep>
							)}

							<div className={styles.step}>
								<h2 className={styles.stepTitle}>5. Товары в заказе</h2>

								<div className={styles.items}>
									{cartItemsMock.map((item) => (
										<div key={item.id} className={styles.itemRow}>
											<div className={styles.itemName}>{item.title}</div>
											<div className={styles.itemQty}>{item.quantity} шт.</div>
											<div className={styles.itemPrice}>
												{(item.price * item.quantity).toLocaleString('ru-RU')} ₽
											</div>
										</div>
									))}
								</div>
							</div>

							{isOrderReady && (
								<FlexRow className={styles.submitRow}>
									<MainButton
										type='button'
										onClick={() => setEditingSection('customer')}
										className={styles.backBtn}
									>
										Назад
									</MainButton>
									<MainButton type='submit' className={styles.submitBtn}>
										Оформить заказ
									</MainButton>
								</FlexRow>
							)}
						</div>

						<aside className={styles.sidebar}>
							<OrderSummary
								itemsTotal={itemsTotal}
								deliveryPrice={deliveryPrice}
								totalPrice={totalPrice}
							/>
						</aside>
					</form>
				</FormProvider>
			</Container>
		</Section>
	)
}
