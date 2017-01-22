import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from 'reducers'

export default (history) => {
	const middlewares = [thunk, apiMiddleware, routerMiddleware(history)]

	const store = createStore(
		rootReducer,
		applyMiddleware(...middlewares)
	)

	return store
}