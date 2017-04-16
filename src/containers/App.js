import React, { Component } from 'react'
import 'stylesheets/main.css'

export default class App extends Component {
	render () {
		return (
			<div>
				<h1 className='welcome'>Welcome</h1>
				{this.props.children}
			</div>
		)
	}
}
