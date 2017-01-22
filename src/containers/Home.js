import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actions from 'actions'

const { getTest } = actions

class Home extends Component {
	render(){
		return (
			<div>
				<div className="content">
				<h1>Home</h1>
					{ 
						JSON.stringify(this.props.test)
					}
				</div>
				<button className="button is-danger" onClick={this.props.getTest}>
					Load
				</button>
				<br />
				<Link to='/about'>
					<button className="button is-primary is-large">Button</button>
				</Link>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	test: state.test.get.data
})

const mapDispatchToProps = (dispatch) => ({
	getTest(){
		dispatch(getTest())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
