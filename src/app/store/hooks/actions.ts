import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { modalActions } from 'src/features/modal/store/modal.slice'
import { breadCrumbsActions } from 'src/widgets/breadcrumbs/store/bread-crumbs.slice'

const actions = {
	...modalActions,
	...breadCrumbsActions,
}
export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}
