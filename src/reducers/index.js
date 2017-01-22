import { combineReducers } from 'redux'
import { routerReducer  } from 'react-router-redux'
import testReducers from 'reducers/testReducers'

export default combineReducers({
	routing: routerReducer,
	test: testReducers
})