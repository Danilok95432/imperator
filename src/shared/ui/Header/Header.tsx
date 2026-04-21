import { useNavigate } from 'react-router-dom'
import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import { CartIconSVG } from '../icons/cartIconSVG'
import { PersonSVG } from '../icons/personSVG'
import styles from './index.module.scss'
import { MainNavigation } from 'src/widgets/main-navigation/main-navigation'
import { LogoSVG } from '../icons/logoSVG'

const authorized = false

export const Header = () => {
	const navigate = useNavigate()
	// const [activeLang, setActiveLang] = useState<string>('RU')

	return (
		<header className={styles.header}>
			<Container className={styles.headerCont}>
				<FlexRow className={styles.headerRow}>
					<div onClick={() => navigate('/')} className={styles.logo}>
						<LogoSVG />
					</div>
					<FlexRow className={styles.controls}>
						{/* <FlexRow className={styles.langSwitcher}>
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
						</FlexRow> */}
						<MainNavigation />
						<FlexRow className={styles.btns}>
							{/* <div className={styles.vector}>
								<SearchSVG />
							</div> */}
							<div className={styles.vector} onClick={() => navigate(authorized ? '/lk' : '/auth')}>
								<PersonSVG />
							</div>
							<div className={styles.vector} onClick={() => navigate('/lk/cart')}>
								<CartIconSVG />
							</div>
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</Container>
		</header>
	)
}
