import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'configureStore'
import { browserHistory } from 'react-router'
import routes from 'routes'

const store = configureStore(browserHistory)

export default () => (
	<Provider store={store} key='provider'>
		{routes(store, browserHistory)}
	</Provider>
)