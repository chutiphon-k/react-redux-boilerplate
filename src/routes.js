import React from 'react'
import {
	Router,
	Route,
	IndexRoute
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

function errorLoading (error) {
	throw new Error(`Dynamic page loading failed: ${error}`)
}

function loadRoute (cb) {
	return component => cb(null, component.default || component)
}

const routes = (store, history) => (
	<Router history={syncHistoryWithStore(history, store)}>
		<Route path='/'
			getComponent = {(location, cb) => { System.import('containers/App').then(loadRoute(cb)).catch(errorLoading) }}>
			<IndexRoute getComponent = {(location, cb) => { System.import('containers/Home').then(loadRoute(cb)).catch(errorLoading) }} />
			<Route path='about' getComponent = {(location, cb) => { System.import('containers/About').then(loadRoute(cb)).catch(errorLoading) }} />
		</Route>
	</Router>
)

export default routes
