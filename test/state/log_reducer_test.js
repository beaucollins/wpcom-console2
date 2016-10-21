import reducer from 'state/reducer/log'
import { insertLog, updateRequestStatus, updateRequestError } from 'state/actions'
import { createStore } from 'redux'
import { deepEqual, equal } from 'assert'

describe( 'log reducer', () => {
	let store
	beforeEach( () => {
		store = createStore( reducer )
	} )

	const subscribe = ( fn, action, defaultState ) => () => new Promise( resolve => {
		store = createStore( reducer, defaultState )
		store.subscribe( () => {
			fn( store.getState() )
			resolve()
		} )
		store.dispatch( action )
	} )

	it( 'should have default state', () => {
		deepEqual(
			store.getState(),
			[]
		)
	} )

	it( 'should append request', subscribe(
		state => {
			equal( state.length, 1 )
			deepEqual( state[0], { version: '1', endpoint: 'endpoint', id: 'id' } )
		},
		insertLog( '1', 'endpoint', 'id' )
	) )

	it( 'should update request status', subscribe(
		( [ response ] ) => {
			deepEqual( response, { id: 'id', status: 200, other: 'other' } )
		},
		updateRequestStatus( 'id', 200 ),
		[ { id: 'id', other: 'other' } ]
	) )

	it( 'should update request error', subscribe(
		( [ { error } ] ) => {
			equal( error.message, 'Something whent wrong' )
		},
		updateRequestError( 'id', new Error( 'Something whent wrong' ) ),
		[ { id: 'id' } ]
	) )
} )
