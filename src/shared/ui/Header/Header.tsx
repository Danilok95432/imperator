import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import { CartIconSVG } from '../icons/cartIconSVG'
import { PersonSVG } from '../icons/personSVG'
import { SearchSVG } from '../icons/searchSVG'
import styles from './index.module.scss'
import logo from 'src/assets/img/logo.png'
import { MainNavigation } from 'src/widgets/main-navigation/main-navigation'

export const Header = () => {
	return (
		<header className={styles.header}>
			<Container className={styles.headerCont}>
				<FlexRow className={styles.headerRow}>
					<img src={logo} alt='logo' />
					<FlexRow className={styles.controls}>
						<MainNavigation />
						<FlexRow className={styles.btns}>
							<SearchSVG />
							<PersonSVG />
							<CartIconSVG />
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</Container>
		</header>
	)
}
