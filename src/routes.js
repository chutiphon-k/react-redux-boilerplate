import React from 'react'
import {
	Router,
	Route,
	IndexRoute
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import About from 'containers/About'
import App from 'containers/App'
import Home from 'containers/Home'


export default (store, history) => (
	<Router history={syncHistoryWithStore(history, store)}>
		<Route path='/' component={App}>
			<IndexRoute component={Home} />
			<route path='about' component={About} />
		</Route>
	</Router>
)