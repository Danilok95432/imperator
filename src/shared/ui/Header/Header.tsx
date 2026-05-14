import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import { CartIconSVG } from '../icons/cartIconSVG'
import { PersonSVG } from '../icons/personSVG'
import styles from './index.module.scss'
import { MainNavigation } from 'src/widgets/main-navigation/main-navigation'
import { LogoSVG } from '../icons/logoSVG'
import { useCheckAuthQuery } from 'src/features/auth/api/auth.api'

export const Header = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { data } = useCheckAuthQuery(null)

	const authorized = useMemo(() => {
		return Boolean(data?.token && data?.user && localStorage.getItem('token') !== null)
	}, [data, location.pathname])

	return (
		<header className={styles.header}>
			<Container className={styles.headerCont}>
				<FlexRow className={styles.headerRow}>
					<div onClick={() => navigate('/')} className={styles.logo}>
						<LogoSVG />
					</div>

					<FlexRow className={styles.controls}>
						<MainNavigation />

						<FlexRow className={styles.btns}>
							<div className={styles.vector} onClick={() => navigate(authorized ? '/lk' : '/auth')}>
								<PersonSVG />
							</div>

							<div
								className={styles.vector}
								onClick={() => navigate(authorized ? '/lk/cart' : '/auth')}
							>
								<CartIconSVG />
							</div>
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</Container>
		</header>
	)
}
