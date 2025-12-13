import { type FC, useState } from 'react'
import { type PathwayItem } from 'src/types/location'

import styles from './index.module.scss'
import cn from 'classnames'
import { RenderedArray } from '../rendered-array/rendered-array'

type PlacementProps = {
	title?: string
	placeVariants: PathwayItem[] | undefined
}

export const Placement: FC<PlacementProps> = ({ title, placeVariants }) => {
	if (!placeVariants?.length) return
	const [activePlace, setActivePlace] = useState({
		placeSrc: placeVariants[0].location ?? '',
		placeIdx: 0,
	})

	const handleChangePlace = (location: string, idx: number) => {
		setActivePlace({
			placeSrc: location,
			placeIdx: idx,
		})
	}

	return (
		<div className={styles.placementWrapper}>
			{title && <h4>{title}</h4>}
			<ul className={styles.placeTabs}>
				{placeVariants?.map((place, idx) => {
					const hasValidMapLink =
						place.location?.includes('https') &&
						(place.location.includes('yandex') || place.location.includes('google'))
					if (!place.location || !hasValidMapLink) return null
					return (
						<li
							className={cn({ active: idx === activePlace.placeIdx })}
							key={idx}
							onClick={() => handleChangePlace(place.location, idx)}
						>
							<h6>{place.title}</h6>
							{Array.isArray(place.desc) ? (
								<RenderedArray
									className={styles.placeListDesc}
									strArray={place.desc}
									asStr='p'
									as='div'
								/>
							) : (
								<p>{place.desc}</p>
							)}
						</li>
					)
				})}
			</ul>
			<div className={styles.placeMap}>
				<iframe src={activePlace.placeSrc} width='100%' height='245' loading='eager'></iframe>
			</div>
		</div>
	)
}
