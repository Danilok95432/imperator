import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'

import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { lkTabNavigation } from './consts'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'

export const LkPage = () => {
	return (
		<Section className={styles.lkSection}>
			<Container className={styles.lkCont}>
				<h1 className={styles.title}>Личный кабинет</h1>
				<div className={styles.classRow}>
					{lkTabNavigation?.map((el, idx) => {
						return (
							<a href={el.link} key={idx}>
								<FlexRow className={styles.classEl}>
									<p>{el.title}</p>
								</FlexRow>
							</a>
						)
					})}
				</div>
				<MainButton type='submit' className={styles.cancelBtn}>
					Выйти из профиля
				</MainButton>
			</Container>
		</Section>
	)
}
