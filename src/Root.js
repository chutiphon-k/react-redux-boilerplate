import React from 'react'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'

import configureStore from 'configureStore'
import routes from 'routes'

const store = configureStore(browserHistory)

const Root = () => (
	<Provider store={store} key='provider'>
		{routes(store, browserHistory)}
	</Provider>
)

export default Root
