import { deepEqual, equal } from 'assert'
import reducer from 'state/reducer/endpoints'
import { clearSelectedEndpoint } from 'state/actions'
import { createStore } from 'redux'
import { merge } from 'ramda'

describe( 'endpoint reducer', () => {
	const defaultState = () => createStore( reducer ).getState()

	const shouldDispatch = ( fn, action, addState = {} ) => () => new Promise( resolve => {
		const { dispatch, subscribe, getState } = createStore( reducer, merge( defaultState(), addState ) )
		subscribe( () => {
			fn( getState() )
			resolve()
		} )
		dispatch( action )
	} )

	it( 'should have default state', () => {
		deepEqual(
			createStore( reducer ).getState(),
			{
				selected_endpoint: null,
				selected_version: null,
				versions: {}
			}
		)
	} )

	it( 'should clear selected endpoint', shouldDispatch(
		state => equal( state.selected_endpoint, null ),
		clearSelectedEndpoint(),
		{ selected_endpoint: 'one', selected_version: '1', versions: { 1: { endpoints: [ { id: 'one' } ] } } }
	) )
} )
