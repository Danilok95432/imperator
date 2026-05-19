import { type FC } from 'react'
import styles from './index.module.scss'
import { useNavigate } from 'react-router'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useActions } from 'src/app/store/hooks/actions'
import { DeleteItemFromCartSVG } from 'src/shared/ui/icons/deleteItemFromCartSVG'

type ConfirmWindowProps = {
	text?: string
	submitHandle: () => void
	link?: string
	notAllow?: boolean
}

export const ConfirmWindow: FC<ConfirmWindowProps> = ({ text, submitHandle, link, notAllow }) => {
	const { closeModal } = useActions()
	const navigate = useNavigate()

	const handleClick = () => {
		submitHandle()
		closeModal()
		navigate(link ?? '/')
	}

	return (
		<div className={styles.confirmWindow}>
			<div className={styles.closeBtn} onClick={() => closeModal()}>
				<DeleteItemFromCartSVG />
			</div>
			{text && <p className={styles.text}>{text}</p>}
			<div className={styles.controlsRow}>
				<MainButton
					className={styles.deleteBtn}
					type='submit'
					disabled={notAllow}
					onClick={handleClick}
				>
					Удалить
				</MainButton>
				<MainButton
					type='submit'
					className={styles.cancelBtn}
					onClick={() => {
						closeModal()
					}}
				>
					Отмена
				</MainButton>
			</div>
		</div>
	)
}
