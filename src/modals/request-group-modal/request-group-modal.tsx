import styles from './index.module.scss'
import { useEffect, useRef, useState } from 'react'
import { AuthModal } from '../auth-modal/auth-modal'
import { RegModal } from '../reg-modal/reg-modal'
import { useActions } from 'src/app/store/hooks/actions'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'

export const RequestGroupModal = () => {
	const { openModal, closeModal } = useActions()
	const modalRef = useRef<HTMLDivElement>(null)
	const [okRequest, setOkRequest] = useState<boolean>(false)
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

	const handleAuth = () => {
		closeModal()
		openModal(<AuthModal />)
	}

	const handleReg = () => {
		closeModal()
		openModal(<RegModal />)
	}

	const handleRequest = () => {
		setOkRequest(true)
	}

	const alreadyInGroup = false
	const nonAuth = false
	const lkReg = true

	if (lkReg) {
		return (
			<div className={styles.reqModal} ref={modalRef}>
				<div className='modal-content'>
					<div className={styles.modalContent}>
						<h2>Вступить в группу</h2>
						<div className={styles.infoMessage}>
							<p>Константин,</p>
							<p>
								Вы подаете заявку на вступление в группу{' '}
								<a href='#'>«Триразвалищенские Полуприседы И с ними Боец-Гармонист»</a>
							</p>
							<span>
								Руководитель: Дормидонт Омниподистович Некрасовищенковский, «Человек сложной судьбы»
							</span>
							<p className={styles.lowP}>
								Руководитель группы получит Вашу заявку. Если им будет принято положительное
								решение, Вы будете приняты в группу автоматически.
							</p>
						</div>
						<div className={styles.disclaimer}>
							<div className={styles.grayBox}>
								<p>
									<span>ВНИМАНИЕ!</span> Нажимая кнопку «Подать заявку», Вы соглашаетесь с тем, что
									Ваши персональные данные будут раскрыты руководителю группы.
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

	if (alreadyInGroup) {
		return (
			<div className={styles.reqModal} ref={modalRef}>
				<div className='modal-content'>
					<div className={styles.modalContent}>
						<h2>Вступить в группу</h2>
						<div className={styles.infoMessage}>
							<p>Константин,</p>
							<p>
								Вы <span className={styles.underDecorSpan}>уже состоите</span> в группе{' '}
								<a href='#'>«Триразвалищенские Полуприседы И с ними Боец-Гармонист»</a>
							</p>
							<p>Повторная заявка в группу, в которой Вы уже состоите, подана быть не может.</p>
						</div>
						<div className={styles.controls}>
							<MainButton onClick={() => closeModal()}>Закрыть</MainButton>
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (nonAuth) {
		return (
			<div className={styles.reqModal} ref={modalRef}>
				<div className='modal-content'>
					<div className={styles.modalContent}>
						<h2>Вступить в группу</h2>
						<div className={styles.infoMessage}>
							<p>Уважаемый гость!</p>
							<p>
								Для того, чтобы подать заявку на вступление в группу, нужно{' '}
								<a onClick={handleAuth}>
									войти на портал «Русский Этноспорт» под Вашими логином и паролем.
								</a>
							</p>
							<p className={styles.lowP}>
								Если у Вас еще нет учетной записи на нашем портале, Вы можете{' '}
								<a onClick={handleReg}>пройти регистрацию.</a>
							</p>
						</div>
						<div className={styles.controls}>
							<MainButton onClick={() => closeModal()}>Закрыть</MainButton>
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (okRequest) {
		return (
			<div className={styles.reqModal} ref={modalRef}>
				<div className='modal-content'>
					<div className={styles.modalContent}>
						<h2>Заявка подана</h2>
						<div className={styles.infoMessage}>
							<p>Константин,</p>
							<p>
								Ваша заявка на вступление в группу{' '}
								<a href='#'>Триразвалищенские Полуприседы И с ними Боец-Гармонист»</a> успешно
								направлена руководителю группы.
							</p>
						</div>
						<div className={styles.controls}>
							<MainButton onClick={() => closeModal()}>Закрыть</MainButton>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.reqModal} ref={modalRef}>
			<div className='modal-content'>
				<div className={styles.modalContent}>
					<h2>Вступить в группу</h2>
					<div className={styles.infoMessage}>
						<p>Константин,</p>
						<p>
							Вы подаете заявку на вступление в группу{' '}
							<a href='#'>«Триразвалищенские Полуприседы И с ними Боец-Гармонист»</a>
						</p>
						<span>
							Руководитель: Дормидонт Омниподистович Некрасовищенковский, «Человек сложной судьбы»
						</span>
						<p className={styles.lowP}>
							Руководитель группы получит Вашу заявку. Если им будет принято положительное решение,
							Вы будете приняты в группу автоматически.
						</p>
					</div>
					<div className={styles.disclaimer}>
						<div className={styles.grayBox}>
							<p>
								<span>ВНИМАНИЕ!</span> Нажимая кнопку «Подать заявку», Вы соглашаетесь с тем, что
								Ваши персональные данные будут раскрыты руководителю группы
							</p>
						</div>
					</div>
					<div className={styles.controls}>
						<MainButton className={styles.sendBtn} onClick={handleRequest}>
							Подать заявку
						</MainButton>
						<MainButton className={styles.closeBtn} onClick={() => closeModal()}>
							Закрыть окно
						</MainButton>
					</div>
				</div>
			</div>
		</div>
	)
}
