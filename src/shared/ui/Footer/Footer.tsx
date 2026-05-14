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
import { autoSetYearCopyright } from 'src/shared/helpers/utils'
import { useLocation } from 'react-use'
import { useMemo } from 'react'
import { useCheckAuthQuery } from 'src/features/auth/api/auth.api'

export const Footer = () => {
	const { data } = useGetSiteSettingsQuery(null)
	const location = useLocation()
	const { data: checkData } = useCheckAuthQuery(null)

	const authorized = useMemo(() => {
		return Boolean(checkData?.token && checkData?.user && localStorage.getItem('token') !== null)
	}, [checkData, location.pathname])
	const infoLinks = [
		{ id: '1', title: 'О нас', link: '/about' },
		{ id: '2', title: 'Контакты', link: '/about/contacts' },
		{ id: '3', title: 'Политика конфиденциальности', link: '/about/politic' },
	]
	const LCLinks = [
		{ id: '1', title: 'Личный кабинет', link: authorized ? '/lk' : '/auth' },
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

	const address = data?.contact_address?.trim()
	const email = data?.contact_email?.trim()
	const vk = data?.contact_vk?.trim()
	const phone = data?.contact_telphone?.trim()

	const yandexMapsUrl = address
		? `https://yandex.ru/maps/?mode=search&text=${encodeURIComponent(address)}`
		: undefined

	const emailUrl = email ? `mailto:${email}` : undefined

	const vkUrl = vk
		? vk.startsWith('http://') || vk.startsWith('https://')
			? vk
			: `https://${vk}`
		: undefined

	const copyright = data?.info_copyright.split('©')[0]

	return (
		<footer className={styles.footer}>
			<Container className={styles.cont}>
				<FlexRow className={styles.footerCont}>
					<FlexRow className={styles.footerRow}>
						<p>
							{copyright ?? data?.info_copyright}
							<br className={styles.perenos} />
							<span className={styles.copyrightYear}>© {autoSetYearCopyright()}</span>
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

							{address ? (
								<a
									href={yandexMapsUrl}
									target='_blank'
									rel='noopener noreferrer'
									className={styles.aboutLink}
								>
									{address}
								</a>
							) : (
								<p>Адрес не указан</p>
							)}
						</FlexRow>

						<FlexRow className={styles.aboutElRow}>
							<PhoneIconSVG />

							{phone ? (
								<a href={`tel:${phone}`} className={styles.telephone}>
									{phone}
								</a>
							) : (
								<p>Телефон не указан</p>
							)}
						</FlexRow>

						<FlexRow className={styles.aboutElRow}>
							<MailIconSVG />

							{email ? (
								<a href={emailUrl} className={styles.aboutLink}>
									{email}
								</a>
							) : (
								<p>Почта не указана</p>
							)}
						</FlexRow>

						<FlexRow className={styles.aboutElRow}>
							<VkIconSVG />

							{vk ? (
								<a
									href={vkUrl}
									target='_blank'
									rel='noopener noreferrer'
									className={styles.aboutLink}
								>
									{vk}
								</a>
							) : (
								<p>VK не указан</p>
							)}
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</Container>
		</footer>
	)
}
