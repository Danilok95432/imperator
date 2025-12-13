import { Outlet } from 'react-router-dom'
import { Footer } from 'src/shared/ui/Footer/Footer'
import { Header } from 'src/shared/ui/Header/Header'

export const AppLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}
