import { CALL_API } from 'redux-api-middleware'

export const getTest = () => dispatch => dispatch({
	[CALL_API]: {
		endpoint: `https://jsonplaceholder.typicode.com/posts/1`,
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		method: 'GET',
		types: [
			'GET_TEST_REQUEST',
			'GET_TEST_SUCCESS',
			'GET_TEST_FAILURE'
	    ]
	}
})