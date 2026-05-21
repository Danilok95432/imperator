import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'

import styles from './index.module.scss'
import { SuccessOrderSVG } from 'src/shared/ui/icons/successOrderSVG'

export const SuccessPage = () => {
	return (
		<Section className={styles.lkSection}>
			<Container className={styles.lkCont}>
				<h1 className={styles.title}>
					<SuccessOrderSVG />
					<span>Ваш заказ оформлен</span>
				</h1>
				<p>Наши специалисты свяжутся с Вами для подтверждения заказа</p>
			</Container>
		</Section>
	)
}
