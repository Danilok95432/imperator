import { useGetSiteSettingsQuery } from 'src/features/settings/api/settings.api'
import { AwardsSection } from 'src/shared/sections/AwardsSection/awards-section'
import { CandySliderSection } from 'src/shared/sections/CandySliderSection/candy-slider-section'
import { CatalogSection } from 'src/shared/sections/CatalogSection/catalog-section'
import { ClassSection } from 'src/shared/sections/ClassSection/class-section'
import { MainImgSection } from 'src/shared/sections/MainImgSection/main-img-section'
import { MainSliderSection } from 'src/shared/sections/MainSliderSection/main-slider-section'
import { ReviewSection } from 'src/shared/sections/ReviewsSection/reviews-section'

export const HomePage = () => {
	const { data } = useGetSiteSettingsQuery(null)
	return (
		<>
			{data?.use_promo && <MainImgSection />}
			{data?.use_awards && <AwardsSection />}
			{data?.use_mainslider && <MainSliderSection />}
			{data?.use_best && <CandySliderSection />}
			{data?.use_adv && <ClassSection />}
			{data?.use_catalog && <CatalogSection />}
			{data?.use_reviews && <ReviewSection />}
		</>
	)
}
