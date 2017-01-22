import React, { Component } from 'react'
import { Link } from 'react-router'

export default class About extends Component {
	render(){
		return (
			<div>
				About
				<br />
				<Link to='eiei'>
					<button className="button is-primary is-large">Button</button>
				</Link>
			</div>
		)
	}
}