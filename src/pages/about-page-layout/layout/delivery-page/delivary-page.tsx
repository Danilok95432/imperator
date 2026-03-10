import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import styles from './index.module.scss'
import classNames from 'classnames'

export const DeliveryPage = () => {
	return (
		<div className={styles.elementPage}>
			<h2 className={styles.title}>Самовывоз или доставка</h2>
			<FlexRow className={styles.rowSection}>
				<FlexRow className={styles.content}>
					<p className={styles.desc}>
						Обработка заказов в нашем интернет-магазине осуществляется с 9:00 до 18:00 c
						понедельника по пятницу. Если вы сделали заказ после этого времени, наши специалисты
						обязательно свяжутся с вами для его подтверждения на следующее утро. Далее мы бережно
						соберем и упакуем ваш заказ.
					</p>
					<p className={styles.desc}>
						При оформлении покупки вы можете выбрать вариант получения заказа.
					</p>
				</FlexRow>
				<FlexRow className={classNames(styles.content, styles.lessGap)}>
					<p className={styles.subtitle}>
						Самовывоз в Санкт-Петербурге (пункт выдачи и производство)
					</p>
					<p className={styles.desc}>
						Адрес: ул. Сестрорецкая, дом 6, ст. м. Черная речка (посмотреть <a href='#'>на карте</a>
						) Если заказ оформлен в выходной или праздничный день, то забрать его можно в первый
						рабочий день. Менеджер свяжется с Вами и уточнит, когда можно будет забрать заказ.
					</p>
					<FlexRow className={styles.customDesc}>
						<p className={styles.bold}>Время работы пункта выдачи:</p>
						<p>Пн-Пт: 09:00 - 16:30 (по МСК), обеденный перерыв: 15:00-15:30.</p>
						<p>Сб-Вс: выходной.</p>
					</FlexRow>
					<FlexRow className={styles.customDesc}>
						<p>
							<span className={styles.bold}>ВАЖНО!</span> Если Вы забираете свои конфеты и шоколад в
							нашем магазине сами, стоимость заказа{' '}
							<span className={styles.bold}>оплачивается банковской картой</span> продавцу при
							получении заказа.
						</p>
					</FlexRow>
				</FlexRow>
				<FlexRow className={classNames(styles.content, styles.lessGap)}>
					<p className={styles.subtitle}>Доставка по России</p>
					<div className={styles.disclaimer}>
						<p>ВНИМАНИЕ! Заказы на доставку принимаются до 20 декабря 2025</p>
					</div>
					<p className={styles.desc}>
						Доставка в регионы осуществляется курьерской{' '}
						<span className={styles.bold}>службой СДЭК</span>.
					</p>
					<p className={styles.desc}>
						<span className={styles.bold}>ВАЖНО!</span> При оформлении указывается{' '}
						<span className={styles.bold}>САМОВЫВОЗ</span>, а после звонка менеджера, уточняете куда
						будет отправка. После получения заказа менеджер свяжется с Вами для подтверждения и
						посчитает стоимость доставки.Стоимость рассчитывается{' '}
						<span className={styles.bold}>по ВЕСУ</span>.
					</p>
					<p className={styles.desc}>
						Товар оплачивается вместе с доставкой{' '}
						<span className={styles.bold}>ПРИ ПОЛУЧЕНИИ!</span>
					</p>
				</FlexRow>
			</FlexRow>
		</div>
	)
}
