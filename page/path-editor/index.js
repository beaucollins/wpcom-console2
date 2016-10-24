import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Connected as PathEditor } from 'ui/path-editor'
import { getSelectedVersionEndpoint, getRequest } from 'state/selectors'
import createLogger from 'redux-logger'
import '../style'
import './style'
import state from './state'

import reducer from 'state/reducer'

const debug = require( 'debug' )( 'console:redux' )
const store = createStore( reducer, state, applyMiddleware( createLogger( { logger: { log: debug } } ) ) )

const Pre = connect( s => ( {
	values: {
		request: getRequest( s ),
		endpoint: getSelectedVersionEndpoint( s )
	}
} ) )( ( { values } ) => (
	<pre>
		{ JSON.stringify( values, null, '\t' ) }
	</pre>
) )

const root = document.createElement( 'div' )
document.body.appendChild( root )
render( <Provider store={ store }>
	<div className="container">
		<div className="bar-container"><PathEditor /></div>
		<Pre />
	</div>
</Provider>, root )
