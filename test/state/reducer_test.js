import { reducer } from 'state'
import { fetchEndpoints, updateEndpoints, selectEndpoints, selectVersionEndpoint } from 'state/actions'
import { createStore } from 'redux'
import { ok, deepEqual, equal } from 'assert'
import {
	getVersions,
	getVersionNames,
	getSelectedVersion,
	getSelectedVersionName,
	getSelectedVersionEndpoint
} from 'state/selectors'

describe( 'reducer', () => {
	const defaultState = () => createStore( reducer ).getState()

	const subscribeAndDispatch = ( subscription, action, state = defaultState() ) => () => new Promise( resolve => {
		const { subscribe, dispatch, getState } = createStore( reducer, state )
		subscribe( () => {
			subscription( getState() )
			resolve()
		} )
		dispatch( action )
	} )

	it( 'should fetch version endpoints', subscribeAndDispatch(
		state => {
			const versions = getVersions( state )
			deepEqual( versions, { 1: { requesting: true, endpoints: [] } } )
		},
		fetchEndpoints()
	) )

	it( 'should update version endpoints', subscribeAndDispatch(
		state => {
			const versions = getVersions( state )
			deepEqual( versions, { 1: { requesting: false, endpoints: [ 'mockendpoint' ] } } )
			ok( state )
		},
		updateEndpoints( [ 'mockendpoint' ], 1 )
	) )

	it( 'should select version names', () => {
		deepEqual(
			getVersionNames( { endpoints: { versions: { 1: 'thing', 2: 'thing' } } } ),
			['1', '2']
		)
	} )

	it( 'should get selected version', () => {
		equal(
			getSelectedVersion( { endpoints: { selected_version: '1', versions: { 1: 'one', 2: 'two' } } }, 1 ),
			'one'
		)
	} )

	it( 'should select version', subscribeAndDispatch(
		state => {
			equal(
				getSelectedVersionName( state ),
				'1'
			)
		},
		selectEndpoints( '1' ),
		{ endpoints: { versions: { 1: 'one', 2: 'two' } } }
	) )

	it( 'should select version endpoint', subscribeAndDispatch(
		state => {
			equal( state.endpoints.selected_endpoint, 'id-1' )
			equal(
				getSelectedVersionEndpoint( state ).name,
				'b'
			)
		},
		selectVersionEndpoint( '1', 'id-1' ),
		{ endpoints: { versions: { 1: { endpoints: [ 'a', { id: 'id-1', name: 'b' }, 'c' ], selected_version: -1 }, 2: 'two' } } }
	) )

	it( 'should get selected version endpoint', () => {
		equal(
			getSelectedVersionEndpoint( createStore( reducer ).getState() ),
			undefined
		)
	} )

	it( 'should have default state', () => {
		deepEqual(
			createStore( reducer ).getState(),
			{ endpoints: { versions: {}, selected_endpoint: null, selected_version: null }, log: [], request: { path: '' } }
		)
	} )
} )
