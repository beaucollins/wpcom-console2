import { SET_PATH, SET_REQUEST_PARAM } from 'state/actions'
import { set, lensProp, lensPath } from 'ramda'

export default ( state = { path: '', params: { path: {}, query: {}, body: {} } }, action ) => {
	switch ( action.type ) {
		case SET_PATH:
			return set( lensProp( 'path' ), action.path, state )
		case SET_REQUEST_PARAM:
			return set(
				lensPath( [ 'params', action.section, action.name ] ),
				action.value
			)( state )
	}
	return state
}
