import { MainRoutes } from '../router/MainRoutes'
import './App.css'
import { Route, Routes } from 'react-router-dom'

export const App = () => {
	return (
		<Routes>
			<Route path='/*' element={<MainRoutes />} />
		</Routes>
	)
}
