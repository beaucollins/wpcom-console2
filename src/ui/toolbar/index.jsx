import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getVersionNames, getSelectedVersionName, getSelectedVersionEndpoint, getPath } from 'state/selectors'
import { selectEndpoints, runEndpoint, setPath } from 'state/actions'
import { applySpec } from 'ramda'
import DropDown from './dropdown'
import './style'

const debug = require( 'debug' )( 'console:ui:toolbar' )

export default class Toolbar extends Component {

	constructor( props ) {
		super( props )
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

	render() {
		const { versions, selectedVersion, path } = this.props
		return (
			<div className="toolbar">
				<div className="version-selector">
					<div className="version-dropdown">
						<DropDown options={ versions } label={ selectedVersion } onSelect={ this.selectEndpoints } />
					</div>
				</div>
				<div className="bar">
					<div className="search-bar" tabIndex="0">
						<div className="search-field"
							contentEditable="true"
							onPaste={ this._onPaste }
							onInput={ this._onInput }
							onChange={ debug }
							suppressContentEditableWarning={ true }
							>{ path }</div>
					</div>
				</div>
				<div tabIndex="0" className="send-button" onClick={ this._run } >Send</div>
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
