import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Section } from 'src/shared/ui/Section/section'

import styles from './index.module.scss'
import { Link } from 'react-router-dom'

export const CatalogSection = () => {
	const catalogInfo = [
		{
			id: '1',
			title: 'Шоколад',
			elements: [
				{
					id: '1',
					title: 'Шоколад молочный',
					link: '/',
				},
				{
					id: '2',
					title: 'Шоколад молочный с МИНДАЛЕМ',
					link: '/',
				},
				{
					id: '3',
					title: 'Шоколад молочный с ФУНДУКОМ',
					link: '/',
				},
				{
					id: '4',
					title: 'Шоколад темный',
					link: '/',
				},
				{
					id: '5',
					title: 'Шоколад темный с ИМБИРЕМ',
					link: '/',
				},
			],
			linkTitle: 'В каталог шоколада',
			linkTo: '/',
			img: 'src/assets/img/catalog(1).png',
		},
		{
			id: '2',
			title: 'Конфеты',
			elements: [
				{
					id: '1',
					title: '«Медный всадник»',
					link: '/',
				},
				{
					id: '2',
					title: '«Кронштадтские форты»',
					link: '/',
				},
				{
					id: '3',
					title: '«Лесной орех»',
					link: '/',
				},
				{
					id: '4',
					title: '«Матильда»',
					link: '/',
				},
				{
					id: '5',
					title: '«Александр»',
					link: '/',
				},
				{
					id: '6',
					title: '«Большой город»',
					link: '/',
				},
				{
					id: '7',
					title: '«Гвардейские»',
					link: '/',
				},
			],
			linkTitle: 'В каталог конфет',
			linkTo: '/',
			img: 'src/assets/img/catalog(2).png',
		},
		{
			id: '3',
			title: 'Наборы',
			elements: [
				{
					id: '1',
					title: 'Набор «Ассорти-элит»',
					link: '/',
				},
				{
					id: '2',
					title: 'Коллекция «Императоры»',
					link: '/',
				},
				{
					id: '3',
					title: 'Набор конфет «Назад в СССР»',
					link: '/',
				},
				{
					id: '4',
					title: 'Набор «Это Питер Детка»',
					link: '/',
				},
				{
					id: '5',
					title: 'Набор «Ассорти» 9 шт.',
					link: '/',
				},
				{
					id: '6',
					title: 'Набор авторских конфет Татьяны Булановой',
					link: '/',
				},
			],
			linkTitle: 'В каталог наборов',
			linkTo: '/',
			img: 'src/assets/img/catalog(3).png',
		},
		{
			id: '4',
			title: 'Конфеты-коктейли',
			elements: [
				{
					id: '1',
					title: 'Конфеты «Белая леди»',
					link: '/',
				},
				{
					id: '2',
					title: 'Конфеты «Белый русский»»',
					link: '/',
				},
				{
					id: '3',
					title: 'Конфеты «Виски сауэр»',
					link: '/',
				},
				{
					id: '4',
					title: 'Конфеты «Космополитен»',
					link: '/',
				},
				{
					id: '5',
					title: 'Конфеты «Маргарита»',
					link: '/',
				},
				{
					id: '6',
					title: 'Конфеты «Негрони»',
					link: '/',
				},
			],
			linkTitle: 'В каталог коктейлей',
			linkTo: '/',
			img: 'src/assets/img/catalog(4).png',
		},
	]
	return (
		<Section className={styles.catalog}>
			<Container>
				<FlexRow className={styles.headRow}>
					<h2>Каталог продукции</h2>
				</FlexRow>
				<FlexRow className={styles.catalogRow}>
					{catalogInfo.map((el) => {
						return (
							<FlexRow className={styles.catalogEl} key={el.id}>
								<div className={styles.imgWrapper}>
									<img src={el.img} alt='' />
								</div>
								<p className={styles.title}>{el.title}</p>
								<FlexRow className={styles.bottomRow}>
									<FlexRow className={styles.linksRow}>
										{el.elements.map((elem) => {
											return (
												<Link to={elem.link} key={elem.id} className={styles.link}>
													{elem.title}
												</Link>
											)
										})}
									</FlexRow>
									<Link to={el.linkTo} className={styles.catalogBtn}>
										{el.linkTitle}
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
