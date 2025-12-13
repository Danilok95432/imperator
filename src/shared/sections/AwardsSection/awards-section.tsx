import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Section } from 'src/shared/ui/Section/section'
import silver from 'src/assets/img/silver.png'
import gold from 'src/assets/img/gold.png'

import styles from './index.module.scss'

export const AwardsSection = () => {
	return (
		<Section className={styles.awards}>
			<Container>
				<FlexRow className={styles.awardsRow}>
					<FlexRow className={styles.awardsEl}>
						<img src={silver} alt='silver' />
						<FlexRow className={styles.infoRowSilver}>
							<p className={styles.title}>Серебряная медаль-2020</p>
							<p className={styles.desc}>
								Темный шоколад без сахара, конфеты «<a href='#'>Медный всадник</a>», «
								<a href='#'>Алые паруса</a>», «<a href='#'>Русские</a>»
							</p>
							<p className={styles.location}>
								XXVII Международный конкурс «Лучший продукт-2020» г. Москва
							</p>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.awardsEl}>
						<img src={gold} alt='gold' />
						<FlexRow className={styles.infoRow}>
							<p className={styles.title}>Золотая медаль-2021</p>
							<p className={styles.desc}>
								Конфеты «<a href='#'>Зимний дворец</a>»,«<a href='#'> Москва</a>», «
								<a href='#'>Белый дом</a>»
							</p>
							<p className={styles.location}>
								Конкурс Союзэкспертизы «За высокие потребительские качества» г. Москва
							</p>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.awardsEl}>
						<img src={gold} alt='gold' />
						<FlexRow className={styles.infoRow}>
							<p className={styles.title}>Золотая медаль-2022</p>
							<p className={styles.desc}>
								Конфеты «<a href='#'>Красный цветок</a>», «<a href='#'>Лесной орех</a>»
							</p>
							<p className={styles.location}>
								Почетным призом «За лучший инновационный продукт» награжден набор конфет ассорти
								«Точка с запятой»
							</p>
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</Container>
		</Section>
	)
}
