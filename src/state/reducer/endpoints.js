import { FETCH_ENDPOINTS, UPDATE_ENDPOINTS, SELECT_ENDPOINTS, SELECT_VERSION_ENDPOINT } from 'state/actions'
import { assocPath, path, always, evolve, merge } from 'ramda'

const version = ( state = { requesting: false, endpoints: [] }, action ) => {
	switch ( action.type ) {
		case FETCH_ENDPOINTS:
			return assocPath( ['requesting'], true )( state )
		case UPDATE_ENDPOINTS:
			return evolve( { requesting: always( false ), endpoints: always( action.endpoints ) } )( state )
		// case SELECT_VERSION_ENDPOINT:
		// 	return evolve( { selected: always( action.endpoint ) }, state )
	}
	return state
}

export default ( state = { versions: {}, selected_version: null, selected_endpoint: null }, action ) => {
	switch ( action.type ) {
		case FETCH_ENDPOINTS:
		case UPDATE_ENDPOINTS:
			const versionPath = [ 'versions', action.version ]
			return assocPath( versionPath, version( path( versionPath, state ), action ) )( state )
		case SELECT_ENDPOINTS:
		case SELECT_VERSION_ENDPOINT:
			return merge( state, {
				selected_version: action.version,
				selected_endpoint: action.id
			} )
	}
	return state
}
