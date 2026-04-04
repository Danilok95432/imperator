import clsx from 'clsx'

import styles from './index.module.scss'
import { type DeliveryOption } from 'src/types/order'
import { CheckCartSVG } from 'src/shared/ui/icons/checkCartSVG'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

type Props = {
	option?: DeliveryOption
	active: boolean
	onClick: () => void
}

export const DeliveryCard = ({ option, active, onClick }: Props) => {
	return (
		<button type='button' className={clsx(styles.card, active && styles.active)} onClick={onClick}>
			<FlexRow className={styles.infoRow}>
				<div className={styles.title}>{option?.title}</div>
				{option?.description && <div className={styles.desc}>{option?.description}</div>}
				{option?.days && <div className={styles.meta}>Доставка: {option?.days}</div>}
			</FlexRow>

			<div className={styles.check}>{active ? <CheckCartSVG /> : ''}</div>
		</button>
	)
}
