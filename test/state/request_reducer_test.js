import { createStore } from 'redux'
import { deepEqual, equal } from 'assert'
import { setPath, setRequestParam } from 'state/actions'
import reducer from 'state/reducer/request'

describe( 'request reducer', () => {
	let store = createStore( reducer )

	const defaultState = () => createStore( reducer ).getState()
	const shouldUpdate = ( subscriber, action, state = defaultState() ) => () => new Promise( resolve => {
		let { subscribe, dispatch, getState } = createStore( reducer, state )
		subscribe( () => {
			subscriber( getState() )
			resolve()
		} )
		dispatch( action )
	} )

	it( 'should have deafult state', () => {
		deepEqual( store.getState(), { path: '', params: {
			path: {},
			query: {},
			body: {}
		} } )
	} )

	it( 'sets path', shouldUpdate(
		state => equal( state.path, 'lol' ),
		setPath( 'lol' )
	) )

	it( 'sets param', shouldUpdate(
		state => equal( state.params.query.foo, 'bar' ),
		setRequestParam( 'query', 'foo', 'bar' )
	) )
} )
