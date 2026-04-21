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
				<Route path={AppRoute.Catalog} element={<ChocolatePage />}>
					<Route path={`${AppRoute.Catalog}/:menuId`} element={<ChocolateList />} />
					<Route
						path={`${AppRoute.Catalog}/:menuId/${AppRoute.CatalogItem}/:itemId`}
						element={<ChocolateItem />}
					/>
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
