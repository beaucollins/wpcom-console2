import React from 'react'
import { shallow } from 'enzyme'
import App from 'ui/app'
import { ok } from 'assert'

describe( '<App />', () => {
	it( 'should render', () => {
		ok( shallow( <App /> ).hasClass( 'app' ) )
	} )
} )
