import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import styles from './index.module.scss'
import { useEffect, useRef } from 'react'
import { type AuthInputs, authSchema } from './schema'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { useActions } from 'src/app/store/hooks/actions'
import { LogoModalMobileSVG } from 'src/shared/ui/icons/logoModalMobileSVG'
import { LogoModalSVG } from 'src/shared/ui/icons/logoModalSVG'
import { FormInput } from 'src/widgets/FormInput/form-input'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'

export const AuthModal = () => {
	const { closeModal } = useActions()
	const modalRef = useRef<HTMLDivElement>(null)
	const breakPoint = useBreakPoint()

	const methods = useForm<AuthInputs>({
		mode: 'onBlur',
		resolver: yupResolver(authSchema),
	})

	const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
		closeModal()
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (window.innerWidth < 768) return

			const modalEl = modalRef.current
			const target = event.target as HTMLElement

			if (!modalEl || modalEl.contains(target)) return

			const { clientX, clientY } = event
			const windowWidth = window.innerWidth
			const windowHeight = window.innerHeight
			const scrollbarSize = 16
			const isClickOnScrollbar =
				clientX >= windowWidth - scrollbarSize || clientY >= windowHeight - scrollbarSize

			if (isClickOnScrollbar) return

			closeModal()
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [closeModal])

	return (
		<div className={styles.authModal} ref={modalRef}>
			<div className='modal-content'>
				<div className={styles.modalContent}>
					{breakPoint === 'S' ? <LogoModalMobileSVG /> : <LogoModalSVG />}
					<h2>Вход в кабинет</h2>
					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(onSubmit)} noValidate className={styles.authForm}>
							<FormInput name='phone' label='Логин (номер телефона)' isPhone={true} />
							<FormInput name='password' label='Пароль' isPassword={true} />
							<MainButton type='submit'>Войти</MainButton>
						</form>
					</FormProvider>
					<p className={styles.forgetPassword}>
						Забыли пароль? <a href='#'>Восстановить</a>
					</p>
				</div>
			</div>
		</div>
	)
}
