import React, { Component } from 'react'
import { Connected as Toolbar } from 'ui/toolbar'
import { Connected as EndpointList } from 'ui/endpoint-list'
import { Connected as Log } from 'ui/log'

const debug = require( 'debug' )( 'console:ui:app' )

import './style'

export default class App extends Component {
	render() {
		return (
			<div className="app">
				<Toolbar />
				<EndpointList />
				<Log />
			</div>
		);
	}
}
