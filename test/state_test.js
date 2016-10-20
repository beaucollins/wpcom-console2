import { reducer } from 'state'
import { createStore } from 'redux'
import { ok } from 'assert'

describe( 'state', () => {
	it( 'should have state', () => {
		const store = createStore( reducer )
		ok( store )
	} )
} )
