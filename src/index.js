import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from 'Root'

const rootEl = document.getElementById('app')

render(
	<Root />,
	rootEl
)