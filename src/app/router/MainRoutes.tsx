import { Route, Routes } from 'react-router-dom'
import { AppLayout } from 'src/pages/app-layout/app-layout'
import { ChocolatePage } from 'src/pages/chocolate-page/chocolate-page'
import { HomePage } from 'src/pages/home-page/HomePage'
import { AppRoute } from './consts'

export const MainRoutes = () => {
	return (
		<Routes>
			{/*
				<Route path={'terminal'} element={<TerminalPage />} />
			<Route path={'terminal/print'} element={<PrintPage />} />
				*/}
			<Route path='/' element={<AppLayout />}>
				<Route index element={<HomePage />} />
				<Route path={AppRoute.Chocolate} element={<ChocolatePage />} />
			</Route>
		</Routes>
	)
}
