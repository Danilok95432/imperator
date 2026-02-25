import { Section } from 'src/shared/ui/Section/section'
import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

export const ClassSection = () => {
	return (
		<Section className={styles.class}>
			<Container className={styles.classCont}>
				<FlexRow className={styles.headRow}>
					<h2>Класс элит</h2>
				</FlexRow>
				<FlexRow className={styles.classRow}>
					<FlexRow className={styles.classEl}>
						<p>Создаем элитный шоколад ручной работы</p>
					</FlexRow>
					<FlexRow className={styles.classEl}>
						<p>Придаем особое значение качеству своей продукции</p>
					</FlexRow>
					<FlexRow className={styles.classEl}>
						<p>Стремимся создать ощущение личного праздника</p>
					</FlexRow>
				</FlexRow>
			</Container>
		</Section>
	)
}
