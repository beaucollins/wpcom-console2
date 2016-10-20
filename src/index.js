import React from 'react'
import { render } from 'react-dom'
import App from 'ui/app'
import './style'

const root = document.createElement( 'div' )
document.body.appendChild( root )
render( <App />, root )

console.log( 'hello world' )
