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

export const Footer = () => {
	const { data } = useGetSiteSettingsQuery(null)
	const infoLinks = [
		{ id: '1', title: 'О нас', link: '/about' },
		{ id: '2', title: 'Самовывоз и доставка', link: '/about/delivery' },
		{ id: '3', title: 'Контакты', link: '/about/contacts' },
		{ id: '4', title: 'Способы оплаты', link: '/about/payment' },
		{ id: '5', title: 'Политика конфиденциальности', link: '/about/politic' },
	]
	const LCLinks = [
		{ id: '1', title: 'Личный кабинет', link: '/lk' },
		{ id: '2', title: 'История заказа', link: '/' },
		{ id: '3', title: 'Закладки', link: '/' },
		{ id: '4', title: 'Рассылка', link: '/' },
	]
	return (
		<footer className={styles.footer}>
			<Container className={styles.cont}>
				<FlexRow className={styles.footerCont}>
					<p>{data?.info_copyright}</p>
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
