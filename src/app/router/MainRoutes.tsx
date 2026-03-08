import { Route, Routes } from 'react-router-dom'
import { AppLayout } from 'src/pages/app-layout/app-layout'
import { ChocolatePage } from 'src/pages/chocolate-page/chocolate-page'
import { HomePage } from 'src/pages/home-page/HomePage'
import { AppRoute } from './consts'
import { ChocolateItem } from 'src/pages/chocolate-page/components/chocolate-item-page/chocolate-item'
import { ChocolateList } from 'src/pages/chocolate-page/components/chocolate-list/chocolate-list'

export const MainRoutes = () => {
	return (
		<Routes>
			{/*
				<Route path={'terminal'} element={<TerminalPage />} />
			<Route path={'terminal/print'} element={<PrintPage />} />
				*/}
			<Route path='/' element={<AppLayout />}>
				<Route index element={<HomePage />} />
				<Route path={AppRoute.Chocolate} element={<ChocolatePage />}>
					<Route index element={<ChocolateList />} />
					<Route path={`${AppRoute.Chocolate}/:id`} element={<ChocolateItem />} />
				</Route>
			</Route>
		</Routes>
	)
}
