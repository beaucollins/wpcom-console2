import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import App from 'ui/app'

describe( '<App />', () => {
	it( 'Should render', () => {
		expect(
			shallow( <App /> ).hasClass( 'app' )
		).to.equal( true )
	} )
} )
