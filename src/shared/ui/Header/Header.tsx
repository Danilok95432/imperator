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
import { useGetCountItemsCartQuery } from 'src/features/catalog/api/catalog.api'

export const Header = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { data } = useCheckAuthQuery(null)

	const token = localStorage.getItem('token')
	const userId = localStorage.getItem('userID') ?? ''

	const authorized = useMemo(() => {
		return Boolean(data?.token && data?.user && token !== null)
	}, [data, token, location.pathname])

	const { data: countCartData } = useGetCountItemsCartQuery(authorized && userId ? userId : '')

	const cartItemsCount = Number(countCartData?.cart_items ?? 0)

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

							<div className={styles.cartVector} onClick={() => navigate('/lk/cart')}>
								<CartIconSVG />

								{cartItemsCount > 0 && <span className={styles.cartBadge}>{cartItemsCount}</span>}
							</div>
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</Container>
		</header>
	)
}
