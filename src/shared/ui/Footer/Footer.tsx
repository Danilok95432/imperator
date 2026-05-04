import { Link } from 'react-router-dom'
import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import styles from './index.module.scss'
import { VkIconSVG } from '../icons/vkIconSVG'
import { LocationIconSVG } from '../icons/locationIconSVG'
import { MailIconSVG } from '../icons/mailIconSVG'
import { PhoneIconSVG } from '../icons/phoneIconSVG'
import classNames from 'classnames'
import { useGetSiteSettingsQuery } from 'src/features/settings/api/settings.api'
import {
	PaymentsFooterMasterCardSVG,
	PaymentsFooterMirSVG,
	PaymentsFooterVisaSVG,
} from '../icons/paymentsFooterSVG'

export const Footer = () => {
	const { data } = useGetSiteSettingsQuery(null)
	const infoLinks = [
		{ id: '1', title: 'О нас', link: '/about' },
		{ id: '2', title: 'Контакты', link: '/about/contacts' },
		{ id: '3', title: 'Политика конфиденциальности', link: '/about/politic' },
	]
	const LCLinks = [
		{ id: '1', title: 'Личный кабинет', link: '/lk' },
		{ id: '2', title: 'История заказа', link: '/' },
		{ id: '3', title: 'Закладки', link: '/' },
		{ id: '4', title: 'Рассылка', link: '/' },
	]
	const shopLinks = [
		{ id: '1', title: 'Как заказать', link: '/' },
		{ id: '2', title: 'Способы оплаты', link: '/about/payment' },
		{ id: '3', title: 'Самовывоз и доставка', link: '/about/delivery' },
		{ id: '4', title: 'Правила возврата', link: '/' },
	]
	return (
		<footer className={styles.footer}>
			<Container className={styles.cont}>
				<FlexRow className={styles.footerCont}>
					<FlexRow className={styles.footerRow}>
						<p>
							{data?.info_copyright}
							<br />© 2026
						</p>
						<FlexRow className={styles.paymentsRow}>
							<PaymentsFooterMirSVG />
							<PaymentsFooterMasterCardSVG />
							<PaymentsFooterVisaSVG />
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.footerRow}>
						<p>Информация</p>
						{infoLinks.map((el) => {
							return (
								<Link to={el.link} key={el.id} className={styles.linkEl}>
									{el.title}
								</Link>
							)
						})}
					</FlexRow>
					<FlexRow className={styles.footerRow}>
						<p>Магазин</p>
						{shopLinks.map((el) => {
							return (
								<Link to={el.link} key={el.id} className={styles.linkEl}>
									{el.title}
								</Link>
							)
						})}
					</FlexRow>
					<FlexRow className={styles.footerRow}>
						<p>Личный кабинет</p>
						{LCLinks.map((el) => {
							return (
								<Link to={el.link} key={el.id} className={styles.linkEl}>
									{el.title}
								</Link>
							)
						})}
					</FlexRow>
					<FlexRow className={styles.footerRow}>
						<p>О магазине</p>
						<FlexRow className={classNames(styles.aboutElRow, styles.start)}>
							<LocationIconSVG />
							<p>{data?.contact_address}</p>
						</FlexRow>
						<FlexRow className={styles.aboutElRow}>
							<PhoneIconSVG />
							<p>{data?.contact_telphone}</p>
						</FlexRow>
						<FlexRow className={styles.aboutElRow}>
							<MailIconSVG />
							<p>{data?.contact_email}</p>
						</FlexRow>
						<FlexRow className={styles.aboutElRow}>
							<VkIconSVG />
							<p>{data?.contact_vk}</p>
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</Container>
		</footer>
	)
}
