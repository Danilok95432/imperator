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
				<Route index element={<HomePage />} />
				<Route path={AppRoute.Chocolate} element={<ChocolatePage />}>
					<Route index element={<ChocolateList />} />
					<Route path={`${AppRoute.Chocolate}/:id`} element={<ChocolateItem />} />
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
