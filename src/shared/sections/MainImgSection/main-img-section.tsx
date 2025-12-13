import { Container } from 'src/shared/ui/Container/Container'
import mainImg from 'src/assets/img/main-img.png'
import styles from './index.module.scss'
import { Section } from 'src/shared/ui/Section/section'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

export const MainImgSection = () => {
	return (
		<Section className={styles.mainImgSection}>
			<Container className={styles.mainCont}>
				<FlexRow className={styles.sectionRow}>
					<FlexRow className={styles.welcomeBlock}>
						<h1>Фабрика Император</h1>
						<p>Шоколад ручной работы без консервантов и пальмовых масел</p>
					</FlexRow>
				</FlexRow>
			</Container>
		</Section>
	)
}
