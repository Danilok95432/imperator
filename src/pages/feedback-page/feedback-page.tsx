/* eslint-disable @typescript-eslint/naming-convention */
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, type SubmitHandler, FormProvider } from 'react-hook-form'
import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { Section } from 'src/shared/ui/Section/section'
import { ControlledInput } from 'src/widgets/controlled-input/controlled-input'

import styles from './index.module.scss'
import {
	useGetFeedBackInfoQuery,
	useSaveFeedbackInfoMutation,
} from 'src/features/auth/api/auth.api'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { ControlledSelect } from 'src/widgets/controlled-select/controlled-select'
import { type FeedbackInputs, feedbackInputsSchema } from './schema'
import { BreadCrumbs } from 'src/widgets/breadcrumbs/bread-crumbs'

export const FeedbackPage = () => {
	const { data } = useGetFeedBackInfoQuery(null)
	const [saveFeedbackInfo] = useSaveFeedbackInfoMutation()
	const methods = useForm<FeedbackInputs>({
		mode: 'onBlur',
		resolver: yupResolver(feedbackInputsSchema),
	})
	const onSubmit: SubmitHandler<FeedbackInputs> = async (data) => {
		const formData = new FormData()
		formData.append('firstname', data.firstname)
		formData.append('email', data.email)
		formData.append('telphone', data.telphone)
		formData.append('text', data.text)
		formData.append(
			'topic',
			typeof data.topic === 'string' ? data.topic : data.topic ? data.topic[0].value : '0',
		)
		const res = await saveFeedbackInfo(formData)
		if (res && 'data' in res) {
			toast.success('Обратная связь успешно отправлена')
		} else {
			toast.error('Ошибка при сохранении данных')
		}
	}

	useEffect(() => {
		if (data) {
			const citysOptions = data.topic ?? []
			const cityOption = citysOptions.find((el) => Number(el.value) === Number(data.topic))
			const { topic_id, topic, ...restData } = data
			methods.reset({
				topic: cityOption ? [cityOption] : [],
				...restData,
			})
		}
	}, [data])

	return (
		<Section className={styles.regSection}>
			<Container className={styles.regCont}>
				<BreadCrumbs crumbsLinksMap={[{ title: 'Обратная связь', link: 'feedback' }]} />
				<h1 className={styles.title}>Обратная связь</h1>
				<FormProvider {...methods}>
					<form
						className={styles.form}
						onSubmit={methods.handleSubmit(onSubmit)}
						noValidate
						autoComplete='off'
					>
						<ControlledInput name='firstname' label='Имя*' margin='0 0 32px 0' />
						<ControlledInput name='email' label='Email*' margin='0 0 32px 0' />
						<ControlledInput name='telphone' label='Телефон*' margin='0 0 32px 0' isPhone />
						<ControlledSelect
							name='topic'
							label='Тема обращения *'
							selectOptions={[]}
							margin='0 0 32px 0'
						/>
						<ControlledInput name='text' label='Текст обращения *' margin='0 0 32px 0' isTextarea />
						<FlexRow className={styles.controlsWrapper}>
							<FlexRow className={styles.controls}>
								<MainButton type='submit' className={styles.enterBtn}>
									Отправить
								</MainButton>
							</FlexRow>
						</FlexRow>
					</form>
				</FormProvider>
			</Container>
		</Section>
	)
}
