import { INSERT_REQUEST, UPDATE_REQUEST_STATUS, UPDATE_REQUEST_ERROR } from 'state/actions'
import { append, map, when, whereEq, curryN, __, merge } from 'ramda'

const request = ( state = {}, action ) => {
	switch ( action.type ) {
		case INSERT_REQUEST:
			return merge( state, { id: action.id, version: action.version, endpoint: action.endpoint } )
		case UPDATE_REQUEST_STATUS:
			return merge( state, { status: action.status } )
		case UPDATE_REQUEST_ERROR:
			return merge( state, { error: action.error } )
	}
	return state
}

export default ( state = [], action ) => {
	switch ( action.type ) {
		case INSERT_REQUEST:
			return append( request( undefined, action ), state )
		case UPDATE_REQUEST_STATUS:
		case UPDATE_REQUEST_ERROR:
			return map(
				when( whereEq( { id: action.id } ), curryN( 2, request )( __, action ) ),
				state
			)
	}
	return state
}
