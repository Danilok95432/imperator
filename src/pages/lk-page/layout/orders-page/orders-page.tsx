import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'

import styles from './index.module.scss'
import { useAdditionalCrumbs } from 'src/app/store/hooks/additionalCrumbs'

export const OrdersPage = () => {
	useAdditionalCrumbs('Мои заказы')
	return (
		<Section className={styles.section}>
			<Container className={styles.cont}>
				<h1 className={styles.title}>Мои заказы</h1>
			</Container>
		</Section>
	)
}
