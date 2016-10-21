import {
	FETCH_ENDPOINTS,
	RUN_ENDPOINT,
	updateEndpoints,
	updateEndpointsFailed,
	insertLog
} from './actions'
import { v4 as uuid } from 'uuid'
import { map, merge } from 'ramda'

const debug = require( 'debug' )( 'console:wpcom' )
const Accept = 'application/json'

const { nextTick } = process;
const parseJson = response => response.json()

export default store => next => action => {
	switch ( action.type ) {
		case FETCH_ENDPOINTS:
			fetch( `https://public-api.wordpress.com/rest/v${action.version}/help`, { headers: { Accept } } )
				.then( parseJson )
				.then(
					endpoints => store.dispatch( updateEndpoints(
						map( endpoint => merge( endpoint, { v: action.version, id: uuid() } ), endpoints ),
						action.version
					) ),
					error => store.dispatch( updateEndpointsFailed( error, action.version ) )
				)
			break;
		case RUN_ENDPOINT:
			const id = uuid()
			nextTick( () => {
				debug( 'time to run endpoint', id, action.version, action.endpoint )
				fetch( `https://public-api.wordpress.com/rest/v${action.version}${action.endpoint.path_labeled}` )
					.then(
						result => debug( 'result', result )
					)
					.catch( e => debug( 'failed to run', e, action ) )
				store.dispatch( insertLog( action.version, action.endpoint, id ) )
			} )
			// TODO: create a log entry with this endpoint request
			// fetch the endpoint with the provided params
			// update success or failure on the logged endpoint
	}
	return next( action )
}
