import React, { Component, cloneElement } from 'react'
import { connect } from 'react-redux'
import { getSelectedVersionEndpoint, getRequest } from 'state/selectors'
import { clearSelectedEndpoint, setRequestParam } from 'state/actions'
import { applySpec, head, addIndex, map, isEmpty } from 'ramda'
import { parser } from './util'
import './style'

class VariablePart extends Component {

	constructor( props ) {
		super( props )
	}

	_onInput = ( e ) => {
		this.props.onUpdate( e.target.textContent )
	}

	render() {
		const { name, value } = this.props
		const placeholder = !value || isEmpty( value ) ? name : null
		return (
			<div className="variable"
				data-placeholder={placeholder}
				onInput={this._onInput}
				suppressContentEditableWarning={true}
				contentEditable={true}>{ value }</div>
		)
	}
}

VariablePart.propTypes = {
	name: React.PropTypes.string,
	value: React.PropTypes.string,
	onUpdate: React.PropTypes.func.isRequired
}

export default class PathEditor extends Component {

	_onUpdatePathParam = ( name, value ) => {
		this.props.setRequestParam( 'path', name, value )
	}

	renderPath() {
		return addIndex( map )( ( component, index ) => {
			return cloneElement( component, { key: index } )
		}, head( parser(
			v => <div className="segment">{ v }</div>,
			name => (
				<VariablePart
					name={name}
					value={this.props.request.params.path[name]}
					onUpdate={ ( value ) => this._onUpdatePathParam( name, value ) } />
			)
		)( ( this.props.endpoint.path_labeled ) ) ) )
	}

	render() {
		const { endpoint } = this.props
		return (
			<div className="path-editor">
				<div className="method">{ endpoint.method }</div>
				<div className="path-segments">
					{ this.renderPath() }
				</div>
				<div onClick={this.props.clearEndpoint} className="cancel">x</div>
			</div>
		)
	}
}

PathEditor.propTypes = {
	endpoint: React.PropTypes.object.isRequired,
	clearEndpoint: React.PropTypes.func,
	setRequestParam: React.PropTypes.func,
	request: React.PropTypes.object
}

const mapState = applySpec( {
	endpoint: getSelectedVersionEndpoint,
	request: getRequest
} )

const mapDispatch = { clearEndpoint: clearSelectedEndpoint, setRequestParam }

export const Connected = connect( mapState, mapDispatch )( PathEditor )
