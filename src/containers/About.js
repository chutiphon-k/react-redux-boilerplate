import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Link } from 'react-router'

class About extends Component {
	state = {}

	render () {
		const { handleSubmit } = this.props
		return (
			<div className="content">
				<h1 className='welcome'>About</h1>
				<form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
					<Field name="dataInput" component="input" type="text" autoFocus />
					<button
						type='submit'
						className='button is-primary'>
						Search
					</button>
				</form>
				Result : { this.props.dataInput } <br />
				<Link to='/'>
					<button className="button is-primary is-large">Button</button>
				</Link>
			</div>
		)
	}
}

const selector = formValueSelector('aboutForm')

const mapStateToProps = (state) => ({
	dataInput: selector(state, 'dataInput')
})

const mapDispatchToProps = (dispatch) => ({
	onSubmit (value) {
		console.log(value)
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({
	form: 'aboutForm'
})(About))
