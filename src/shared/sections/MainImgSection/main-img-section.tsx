import { Container } from 'src/shared/ui/Container/Container'
import styles from './index.module.scss'
import { Section } from 'src/shared/ui/Section/section'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { useGetPromoListQuery } from 'src/features/home/api/home.api'

type PromoRowStyle = React.CSSProperties & {
	'--promo-bg'?: string
}

export const MainImgSection = () => {
	const { data } = useGetPromoListQuery(null)

	const promoImage = data?.img?.[0]?.original

	const sectionRowStyle: PromoRowStyle | undefined = promoImage
		? { '--promo-bg': `url(${promoImage})` }
		: undefined

	return (
		<Section className={styles.mainImgSection}>
			<Container className={styles.mainCont}>
				<FlexRow className={styles.sectionRow} style={sectionRowStyle}>
					<FlexRow className={styles.welcomeBlock}>
						<h1>{data?.block_name ?? 'Фабрика Император'}</h1>
						<p>{data?.block_desc ?? 'Шоколад ручной работы без консервантов и пальмовых масел'}</p>
					</FlexRow>
				</FlexRow>
			</Container>
		</Section>
	)
}
