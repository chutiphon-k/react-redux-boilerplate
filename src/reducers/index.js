import { combineReducers } from 'redux'
import { routerReducer  } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import testReducers from 'reducers/testReducers'

export default combineReducers({
	routing: routerReducer,
	form: formReducer,
	test: testReducers
})