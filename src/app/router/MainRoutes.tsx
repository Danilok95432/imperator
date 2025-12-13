import { Route, Routes } from 'react-router-dom'
import { AppLayout } from 'src/pages/app-layout/app-layout'
import { ContentPageLayout } from 'src/pages/content-page/content-page-layout'
import { NewsDetailsNew } from 'src/pages/content-page/news-details/news-details'
import { VideoDetails } from 'src/pages/content-page/video-details/video-details'
import { HomePage } from 'src/pages/home-page/HomePage'

export const MainRoutes = () => {
	return (
		<Routes>
			{/*
				<Route path={'terminal'} element={<TerminalPage />} />
			<Route path={'terminal/print'} element={<PrintPage />} />
				*/}
			<Route path='/' element={<AppLayout />}>
				<Route index element={<HomePage />} />
				<Route path={'/content'} element={<ContentPageLayout />} />
				<Route path={'/content/news/:id'} element={<NewsDetailsNew />} />
				<Route path={'/content/videos/:id'} element={<VideoDetails />} />
			</Route>
		</Routes>
	)
}
