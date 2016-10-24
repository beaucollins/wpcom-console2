import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Connected as EndpointList } from 'ui/endpoint-list'
import { Connected as PathEditor } from 'ui/path-editor'
import { getVersionNames, getSelectedVersionName, getSelectedVersionEndpoint, getPath } from 'state/selectors'
import { selectEndpoints, runEndpoint, setPath } from 'state/actions'
import { applySpec, ifElse, isNil } from 'ramda'
import DropDown from './dropdown'
import './style'

const debug = require( 'debug' )( 'console:ui:toolbar' )

export default class Toolbar extends Component {

	constructor( props ) {
		super( props )
		this.state = {
			showEndpoints: false
		}
	}

	selectEndpoints = version => {
		debug( 'select endpoints', version )
		this.props.selectEndpoints( version )
	}

	_run = () => {
		this.props.runEndpoint( this.props.selectedVersion, this.props.endpoint )
	}

	_onInput = ( e ) => {
		this.props.setPath( e.target.textContent )
	}

	_onPaste = ( e ) => {
		e.preventDefault()
		document.execCommand( 'insertText', false, e.clipboardData.getData( 'text/plain' ) )
	}

	_onBeginSearching = () => {
		clearTimeout( this._barTimer )
		this.setState( { showEndpoints: true } )
	}

	_onLeaveSearchBar = () => {
		this._barTimer = setTimeout( () => this.setState( { showEndpoints: false } ), 100 )
	}

	renderBar = () => ifElse(
		() => this.props.endpoint,
		() => 'endpoint editor',
		() => 'other'
	)()

	render() {
		const { versions, selectedVersion, path, endpoint } = this.props
		const { showEndpoints } = this.state
		return (
			<div className="header">
				<div className="toolbar">
					<div className="version-selector">
						<div className="version-dropdown">
							<DropDown options={ versions } label={ selectedVersion } onSelect={ this.selectEndpoints } />
						</div>
					</div>
					<div className="bar">
						{ ifElse(
							() => isNil( endpoint ),
							() => (
								<div className="search-bar">
									<div className="search-field"
										contentEditable="true"
										onPaste={ this._onPaste }
										onInput={ this._onInput }
										onChange={ debug }
										onFocus={ this._onBeginSearching }
										onBlur={ this._onLeaveSearchBar }
										suppressContentEditableWarning={ true }
										>{ path }</div>
								</div>
							),
							() => <PathEditor />
						)() }
					</div>
					<div tabIndex="0" className="send-button" onClick={ this._run } >Send</div>
				</div>
				{ showEndpoints && <EndpointList /> }
			</div>
		);
	}
}

Toolbar.propTypes = {
	versions: React.PropTypes.arrayOf( React.PropTypes.string ),
	selectEndpoints: React.PropTypes.func,
	selectedVersion: React.PropTypes.string,
	path: React.PropTypes.string,
	endpoint: React.PropTypes.object,
	runEndpoint: React.PropTypes.func,
	setPath: React.PropTypes.func
}

Toolbar.defaultProps = {
	versions: [],
	selectedVersion: 'All'
}

const mapState = applySpec( {
	versions: getVersionNames,
	selectedVersion: getSelectedVersionName,
	endpoint: getSelectedVersionEndpoint,
	path: getPath
} )

export const Connected = connect( mapState, { selectEndpoints, runEndpoint, setPath } )( Toolbar )
