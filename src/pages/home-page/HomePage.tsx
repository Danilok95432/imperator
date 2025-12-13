import { FaqSection } from 'src/shared/sections/FaqSection/faq-section'
import { MainInfoSection } from 'src/shared/sections-new/MainInfoSection/main-info-section'
import { MainSliderSection } from 'src/shared/sections/MainSliderSection/main-slider-section'
import { GallerySection } from 'src/shared/sections-new/GallerySection/gallery-section'
import { ProgramSection } from 'src/shared/sections/ProgramSection/program-section'
import { NewsSection } from 'src/shared/sections/NewsSection/news-section'
import { VideosSection } from 'src/shared/sections/VideosSection/videos-section'
import { OrgsSection } from 'src/shared/sections/OrgsSection/orgs-section'

export const HomePage = () => {
	return (
		<>
			<MainInfoSection />
			<MainSliderSection />
			<GallerySection />
			<ProgramSection />
			<NewsSection />
			<VideosSection />
			<OrgsSection />
			<FaqSection />
		</>
	)
}
