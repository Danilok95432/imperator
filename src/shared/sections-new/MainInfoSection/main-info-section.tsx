import mainImg from 'src/assets/img/main-img.png'
import styles from './index.module.scss'
import { Section } from 'src/shared/ui/Section/section'
import { Container } from 'src/shared/ui/Container/Container'
import cn from 'classnames'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainInfoTypeSVG } from 'src/shared/ui/icons/mainInfoTypeSVG'
import { MainInfoKindSVG } from 'src/shared/ui/icons/mainInfoKindSVG'
import { MainInfoFreqSVG } from 'src/shared/ui/icons/mainInfoFreqSVG'
import { MainInfoPlaceSVG } from 'src/shared/ui/icons/mainInfoPlaceSVG'
import { useState } from 'react'
import { MainInfoDateSVG } from 'src/shared/ui/icons/mainInfoDateSVG'
import { MainInfoLocationSVG } from 'src/shared/ui/icons/mainInfoLocationSVG'
import { MainInfoOrgSVG } from 'src/shared/ui/icons/mainInfoOrgSVG'
import { BuyTicketModal } from 'src/modals/buy-ticket-modal/buy-ticket-modal'
import { useActions } from 'src/app/store/hooks/actions'

export const MainInfoSection = () => {
	const [activeCont, setActiveCont] = useState<boolean>(false)
	const { openModal } = useActions()

	return (
		<Section className={cn(styles.mainInfo)}>
			<Container className={styles.offContainer} off>
				<img src={mainImg} alt='main' className={styles.mobileImg} />
			</Container>
			<Container>
				<FlexRow className={styles.mainRow}>
					<img src={mainImg} alt='main' className={styles.imgMain} />
					<h1>{'Этнофестиваль «Атмановские кулачки-2025»'}</h1>
					<FlexRow className={styles.additionalInfoRow}>
						<FlexRow className={styles.rowEl}>
							<MainInfoTypeSVG />
							<p>{'Фестиваль'}</p>
						</FlexRow>
						<FlexRow className={styles.rowEl}>
							<MainInfoKindSVG />
							<p>{'Культура, развлечения'}</p>
						</FlexRow>
						<FlexRow className={styles.rowEl}>
							<MainInfoFreqSVG />
							<p>{'Раз в год'}</p>
						</FlexRow>
						<FlexRow className={cn(styles.rowEl, styles.noMargin, styles.locationEl)}>
							<MainInfoPlaceSVG />
							<a href='#'>С. Атманов Угол, Сосновский округ, Тамбовская область, Россия</a>
						</FlexRow>
						<FlexRow className={cn(styles.rowEl, styles.ageRowEl)}>
							<div className={styles.dot}></div>
							<p className={styles.age}>{'0+'}</p>
						</FlexRow>
						<FlexRow className={cn(styles.rowEl, styles.mobileRow)}>
							<button
								className={styles.buyBtn}
								onClick={() => openModal(<BuyTicketModal id='1' />)}
							>
								<div className={styles.text}>
									<p>Купить билет</p>
									<p>от 8 000 ₽</p>
								</div>
							</button>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.blocksRow}>
						<FlexRow className={styles.blockEl}>
							<FlexRow className={styles.infoBlock}>
								<p className={styles.title}>{'24 авг 2025, 09:00 — 27 авг 2025, 22:30'}</p>
								<p>{'Всего 3 дня 20 часов Через 27 дней'}</p>
							</FlexRow>
							<div className={styles.vector}>
								<MainInfoDateSVG />
							</div>
						</FlexRow>
						<FlexRow className={styles.blockEl}>
							<FlexRow className={styles.infoBlock}>
								<p className={styles.title}>{'ТРК «Сельский клуб»'}</p>
								<p>{'С. Атманов Угол, пр. Первых Пятилеток, 22'}</p>
								<a href='#'>На карте</a>
							</FlexRow>
							<div className={styles.vector}>
								<MainInfoLocationSVG />
							</div>
						</FlexRow>
						<FlexRow className={styles.blockEl}>
							<FlexRow className={styles.infoBlock}>
								<p className={styles.title}>{'Правительство Тамбовской области'}</p>
							</FlexRow>
							<div className={styles.vector}>
								<MainInfoOrgSVG />
							</div>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.infoRow}>
						<div className={styles.textCont}>
							<p className={cn(styles.text, { [styles.activeText]: activeCont })}>
								«Атмановские кулачки» — народное название праздничных кулачных боёв, которые
								проходят в Атмановом Углу со дня основания села в 1648 году. Также на фестивале
								проводятся состязания по лапте, стрельбе из лука, борьбе за вороток, силовой игре в
								мяч и в других дисциплинах. <br />
								«Атмановские кулачки» — народное название праздничных кулачных боёв, которые
								проходят в Атмановом Углу со дня основания села в 1648 году. Также на фестивале
								проводятся состязания по лапте, стрельбе из лука, борьбе за вороток, силовой игре в
								мяч и в других дисциплинах. <br /> «Атмановские кулачки» — народное название
								праздничных кулачных боёв, которые проходят в Атмановом Углу со дня основания села в
								1648 году. Также на фестивале проводятся состязания по лапте, стрельбе из лука,
								борьбе за вороток, силовой игре в мяч и в других дисциплинах.
							</p>
							<button
								className={cn(styles.openContBtn, { [styles.active]: activeCont })}
								onClick={() => setActiveCont(!activeCont)}
							>
								{activeCont ? 'Свернуть' : 'Развернуть'}
							</button>
						</div>
						<button className={styles.buyBtn} onClick={() => openModal(<BuyTicketModal id='1' />)}>
							<div className={styles.text}>
								<p>Купить билет</p>
								<p>от 8 000 ₽</p>
							</div>
						</button>
					</FlexRow>
				</FlexRow>
			</Container>
		</Section>
	)
}
