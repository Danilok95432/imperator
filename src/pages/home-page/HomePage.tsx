import { AwardsSection } from 'src/shared/sections/AwardsSection/awards-section'
import { CandySliderSection } from 'src/shared/sections/CandySliderSection/candy-slider-section'
import { CatalogSection } from 'src/shared/sections/CatalogSection/catalog-section'
import { ClassSection } from 'src/shared/sections/ClassSection/class-section'
import { MainImgSection } from 'src/shared/sections/MainImgSection/main-img-section'
import { MainSliderSection } from 'src/shared/sections/MainSliderSection/main-slider-section'
import { ReviewSection } from 'src/shared/sections/ReviewsSection/reviews-section'

export const HomePage = () => {
	return (
		<>
			<MainImgSection />
			<AwardsSection />
			<MainSliderSection />
			<CandySliderSection />
			<ClassSection />
			<CatalogSection />
			<ReviewSection />
		</>
	)
}
