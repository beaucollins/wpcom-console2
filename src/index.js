import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from 'state/reducer'
import wpcom from 'state/wpcom'
import { fetchEndpoints, setPath } from 'state/actions'
import createLogger from 'redux-logger'
import App from 'ui/app'
import './style'
import { map, compose } from 'ramda'

const log = require( 'debug' )( 'console:redux' )
const store = createStore( reducer, applyMiddleware( wpcom, createLogger( { logger: { log } } ) ) )

const root = document.createElement( 'div' )
document.body.appendChild( root )
render( <Provider store={ store }><App /></Provider>, root )

map( compose( store.dispatch, fetchEndpoints ) )( ['1', '1.1', '1.2', '1.3'] )
