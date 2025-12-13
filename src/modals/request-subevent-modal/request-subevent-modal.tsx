/* eslint-disable @typescript-eslint/naming-convention */
import styles from './index.module.scss'
import { type FC, useEffect, useRef } from 'react'

import { RegModal } from '../reg-modal/reg-modal'
import { useGetSubEventProgramByIdQuery } from 'src/features/home/api/home.api'
import { useActions } from 'src/app/store/hooks/actions'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'

type RequestSubEventModalProps = {
	id_subEvent: string
}

export const RequestSubEventModal: FC<RequestSubEventModalProps> = ({ id_subEvent }) => {
	const { data: subEventData } = useGetSubEventProgramByIdQuery(id_subEvent)
	const { openModal, closeModal } = useActions()
	const modalRef = useRef<HTMLDivElement>(null)

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

	const handleReg = () => {
		closeModal()
		openModal(<RegModal />)
	}

	return (
		<div className={styles.reqModal} ref={modalRef}>
			<div className='modal-content'>
				<div className={styles.modalContent}>
					<h2>Заявка на подсобытие</h2>
					<div className={styles.infoMessage}>
						<p>
							Вы подаете заявку на на участие в подсобытии <a href='#'>«{subEventData?.title}»</a>
						</p>
						<span>Основное событие: «Атмановские Кулачки 2025»</span>
						<p className={styles.lowP}>
							Организаторы события получат Вашу заявку.
							<br />
							Если ими будет принято положительное решение, Вы будете включены в состав участников.
						</p>
					</div>
					<div className={styles.disclaimer}>
						<div className={styles.grayBox}>
							<p>
								<span>ВНИМАНИЕ!</span> Нажимая кнопку «Подать заявку», Вы соглашаетесь с тем, что
								Ваши персональные данные будут раскрыты организаторам события, и, если выбран
								групповой вид, руководителю группы.
								<br />
								<br />
								Для подачи заявки система перенаправит Вас на отдельный сайт Личного Кабинета
								участника.
							</p>
						</div>
					</div>
					<div className={styles.controlsWrapper}>
						<MainButton className={styles.sendBtn} onClick={() => closeModal()}>
							Подать заявку в Личном Кабинете
						</MainButton>
						<div className={styles.disclaimer}>
							<div className={styles.grayBox}>
								<p>
									Если у Вас еще нет учетной записи и Личного Кабинета в системе, пройдите,
									пожалуйста, регистрацию, нажав на кнопку «Пройти регистрацию участника»,
									расположенную ниже.
								</p>
							</div>
						</div>
						<div className={styles.controls}>
							<MainButton className={styles.sendBtn} onClick={handleReg}>
								Пройти регистрацию участника
							</MainButton>
							<MainButton className={styles.closeBtn} onClick={() => closeModal()}>
								Закрыть окно
							</MainButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
