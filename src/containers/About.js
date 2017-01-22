import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Field, reduxForm, formValueSelector } from 'redux-form'

class About extends Component {

    state = {}

	render(){
		const { handleSubmit } = this.props
		return (
			<div>
			    <form onSubmit={handleSubmit} className='form' action='javascript:void(0)'>
					<Field name="dataInput" component="input" type="text" autoFocus />
					<button
				    	type='submit'
				        className='button is-primary'>
				        Search
			    	</button>
			    </form>
			    Result : { this.props.dataInput }
			</div>
		)
	}
}

About = reduxForm({
	form: 'aboutForm'
})(About)

const selector = formValueSelector('aboutForm')

const mapStateToProps = (state) => ({
	dataInput: selector(state, 'dataInput')
})

const mapDispatchToProps = (dispatch) => ({
	onSubmit(value){
		console.log(value)
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(About)