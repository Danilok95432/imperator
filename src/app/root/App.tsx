import { useLazyCheckAuthQuery } from 'src/features/auth/api/auth.api'
import { MainRoutes } from '../router/MainRoutes'
import { useActions } from '../store/hooks/actions'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

export const App = () => {
	const [checkAuth, { data: authData }] = useLazyCheckAuthQuery()
	const { setAuth, setUser } = useActions()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth(null).catch((err) => console.error(err))
		}
	}, [])

	useEffect(() => {
		if (authData) {
			localStorage.setItem('token', authData.token)
			setAuth(true)
			setUser(authData.user)
		}
	}, [authData])

	return (
		<Routes>
			<Route path='/*' element={<MainRoutes />} />
		</Routes>
	)
}
