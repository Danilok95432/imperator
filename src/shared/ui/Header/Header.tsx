import { useLocation, useNavigate } from 'react-router-dom'
import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import { CartIconSVG } from '../icons/cartIconSVG'
import { PersonSVG } from '../icons/personSVG'
import { SearchSVG } from '../icons/searchSVG'
import styles from './index.module.scss'
import logo from 'src/assets/img/logo.png'
import { MainNavigation } from 'src/widgets/main-navigation/main-navigation'
import { useState } from 'react'

import cn from 'classnames'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'

export const Header = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const breakPoint = useBreakPoint()
	const [activeLang, setActiveLang] = useState<string>('RU')

	const showLangSwitcher = location.pathname.includes('/chocolate')

	return (
		<header className={styles.header}>
			<Container className={styles.headerCont}>
				<FlexRow className={styles.headerRow}>
					<img className={styles.logo} src={logo} alt='logo' onClick={() => navigate('/')} />
					<FlexRow className={styles.controls}>
						{showLangSwitcher && breakPoint !== 'S' && (
							<FlexRow className={styles.langSwitcher}>
								<p
									className={cn({ [styles.activeLang]: activeLang === 'RU' })}
									onClick={() => setActiveLang('RU')}
								>
									RU
								</p>
								<p
									className={cn({ [styles.activeLang]: activeLang === 'EN' })}
									onClick={() => setActiveLang('EN')}
								>
									EN
								</p>
							</FlexRow>
						)}
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
