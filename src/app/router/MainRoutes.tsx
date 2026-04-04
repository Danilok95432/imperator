import { Route, Routes } from 'react-router-dom'
import { AppLayout } from 'src/pages/app-layout/app-layout'
import { ChocolatePage } from 'src/pages/chocolate-page/chocolate-page'
import { HomePage } from 'src/pages/home-page/HomePage'
import { AppRoute } from './consts'
import { ChocolateItem } from 'src/pages/chocolate-page/components/chocolate-item-page/chocolate-item'
import { ChocolateList } from 'src/pages/chocolate-page/components/chocolate-list/chocolate-list'
import { AboutPageLayout } from 'src/pages/about-page-layout/about-page-layout'
import { AboutPage } from 'src/pages/about-page-layout/layout/about-page/about-page'
import { DeliveryPage } from 'src/pages/about-page-layout/layout/delivery-page/delivary-page'
import { ContactsPage } from 'src/pages/about-page-layout/layout/contacts-page/contacts-page'
import { PaymentPage } from 'src/pages/about-page-layout/layout/payment-page/payment-page'
import { PoliticPage } from 'src/pages/about-page-layout/layout/politic-page/politic-page'
import { AuthPage } from 'src/pages/auth-page-layout/layout/auth-page/auth-page'
import { RegistrationPage } from 'src/pages/auth-page-layout/layout/registration-page/registration-page'
import { AuthPageLayout } from 'src/pages/auth-page-layout/auth-page-layout'
import { CandyPage } from 'src/pages/candy-page/candy-page'
import { CandyList } from 'src/pages/candy-page/components/candy-list/candy-list'
import { CandyItem } from 'src/pages/candy-page/components/candy-item-page/candy-item'
import { SetsPage } from 'src/pages/sets-page/sets-page'
import { SetList } from 'src/pages/sets-page/components/set-list/set-list'
import { SetItem } from 'src/pages/sets-page/components/sets-item-page/set-item'
import { CoctailPage } from 'src/pages/coctail-page/coctail-page'
import { CoctailList } from 'src/pages/coctail-page/components/coctail-list/coctail-list'
import { CoctailItem } from 'src/pages/coctail-page/components/coctail-item-page/coctail-item'
import { SpecialSeriesPage } from 'src/pages/special-series-page/special-series-page'
import { SpecialSeriesList } from 'src/pages/special-series-page/components/special-series-list/special-series-list'
import { SpecialSeriesItem } from 'src/pages/special-series-page/components/special-series-item-page/special-series-item'
import { LkPageLayout } from 'src/pages/lk-page/lk-page-layout'
import { LkPage } from 'src/pages/lk-page/layout/lk-page/lk-page'
import { InfoPage } from 'src/pages/lk-page/layout/info-page/info-page'
import { FavoriteItems } from 'src/pages/lk-page/layout/favorite-items/favorite-items'
import { OrdersPage } from 'src/pages/lk-page/layout/orders-page/orders-page'
import { CartPage } from 'src/pages/lk-page/layout/cart-page/cart-page'

export const MainRoutes = () => {
	return (
		<Routes>
			{/*
				<Route path={'terminal'} element={<TerminalPage />} />
			<Route path={'terminal/print'} element={<PrintPage />} />
				*/}
			<Route path='/' element={<AppLayout />}>
				<Route path={AppRoute.AUTH} element={<AuthPageLayout />}>
					<Route index element={<AuthPage />} />
					<Route
						path={`${AppRoute.AUTH}/${AppRoute.REGISTRATION}`}
						element={<RegistrationPage />}
					/>
				</Route>
				<Route path={AppRoute.LK} element={<LkPageLayout />}>
					<Route index element={<LkPage />} />
					<Route path={`${AppRoute.LK}/${AppRoute.LKinfo}`} element={<InfoPage />} />
					<Route path={`${AppRoute.LK}/${AppRoute.LKfavorite}`} element={<FavoriteItems />} />
					<Route path={`${AppRoute.LK}/${AppRoute.LKorders}`} element={<OrdersPage />} />
					<Route path={`${AppRoute.LK}/${AppRoute.LKcart}`} element={<CartPage />} />
				</Route>
				<Route index element={<HomePage />} />
				<Route path={AppRoute.Chocolate} element={<ChocolatePage />}>
					<Route index element={<ChocolateList />} />
					<Route path={`${AppRoute.Chocolate}/:id`} element={<ChocolateItem />} />
				</Route>
				<Route path={AppRoute.Candy} element={<CandyPage />}>
					<Route index element={<CandyList />} />
					<Route path={`${AppRoute.Candy}/:id`} element={<CandyItem />} />
				</Route>
				<Route path={AppRoute.Sets} element={<SetsPage />}>
					<Route index element={<SetList />} />
					<Route path={`${AppRoute.Sets}/:id`} element={<SetItem />} />
				</Route>
				<Route path={AppRoute.Coctail} element={<CoctailPage />}>
					<Route index element={<CoctailList />} />
					<Route path={`${AppRoute.Coctail}/:id`} element={<CoctailItem />} />
				</Route>
				<Route path={AppRoute.SpecialSeries} element={<SpecialSeriesPage />}>
					<Route index element={<SpecialSeriesList />} />
					<Route path={`${AppRoute.SpecialSeries}/:id`} element={<SpecialSeriesItem />} />
				</Route>
				<Route path={AppRoute.ABOUT} element={<AboutPageLayout />}>
					<Route index element={<AboutPage />} />
					<Route path={`${AppRoute.ABOUT}/${AppRoute.DELIVERY}`} element={<DeliveryPage />} />
					<Route path={`${AppRoute.ABOUT}/${AppRoute.CONTACTS}`} element={<ContactsPage />} />
					<Route path={`${AppRoute.ABOUT}/${AppRoute.PAYMENT}`} element={<PaymentPage />} />
					<Route path={`${AppRoute.ABOUT}/${AppRoute.POLITIC}`} element={<PoliticPage />} />
				</Route>
			</Route>
		</Routes>
	)
}
