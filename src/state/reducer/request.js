import { SET_PATH } from 'state/actions'
import { set, lensProp } from 'ramda'

export default ( state = { path: '' }, action ) => {
	switch ( action.type ) {
		case SET_PATH:
			return set( lensProp( 'path' ), action.path, state )
	}
	return state
}
