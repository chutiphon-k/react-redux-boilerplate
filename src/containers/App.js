import React, { Component } from 'react'

import styles from 'stylesheets/main.css'

export default class App extends Component {
	render () {
		return (
			<div>
				<h1 className={styles.welcome}>Welcome</h1>
				{this.props.children}
			</div>
		)
	}
}
