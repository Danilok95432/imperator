import { Outlet } from 'react-router-dom'
import { Footer } from 'src/shared/ui/Footer/Footer'
import { MainNavigation } from 'src/widgets/main-navigation/main-navigation'

export const AppLayout = () => {
	return (
		<>
			<MainNavigation />
			<Outlet />
			<Footer />
		</>
	)
}
