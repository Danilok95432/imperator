import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Section } from 'src/shared/ui/Section/section'

import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { useGetCategoriesCatalogQuery } from 'src/features/catalog/api/catalog.api'
import { AppRoute } from 'src/app/router/consts'

import skeleton from 'src/assets/img/catalog(1).png'

export const CatalogSection = () => {
	const { data } = useGetCategoriesCatalogQuery(null)
	return (
		<Section className={styles.catalog}>
			<Container>
				<FlexRow className={styles.headRow}>
					<h2>Каталог продукции</h2>
				</FlexRow>
				<FlexRow className={styles.catalogRow}>
					{data?.catalogs.map((el) => {
						return (
							<FlexRow className={styles.catalogEl} key={el.id}>
								<div className={styles.imgWrapper}>
									<img src={el.img && el.img.length > 0 ? el.img[0].original : skeleton} alt='' />
								</div>
								<p className={styles.title}>{el.title}</p>
								<FlexRow className={styles.bottomRow}>
									<FlexRow className={styles.linksRow}>
										{el.subcats?.slice(0, 7).map((elem) => {
											return (
												<Link to={'#'} key={elem.id} className={styles.link}>
													{elem.title}
												</Link>
											)
										})}
									</FlexRow>
									<Link to={`${AppRoute.Catalog}/${el.id}`} className={styles.catalogBtn}>
										<p>{`В каталог "${el.title}"`}</p>
									</Link>
								</FlexRow>
							</FlexRow>
						)
					})}
				</FlexRow>
			</Container>
		</Section>
	)
}
