const initialState = {
	get: {
		data: {},
	}
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'GET_TEST_REQUEST':
			return {
				...state,
				get: {
					...state.get
				}
			}
		case 'GET_TEST_SUCCESS':
			return {
				...state,
				get: {
					...state.get,
					data: action.payload
				}
			}
		case 'GET_TEST_FAILURE':
			return {
				...state,
				get: {
					...state.get
				}
			}
		default:
			return state
	}
}