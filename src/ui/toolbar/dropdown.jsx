import React, { Component } from 'react'
import { when, where, equals, invoker, converge, pipe, addIndex, map } from 'ramda'
import classnames from 'classnames'

const whenKeyCode = code => when( where( { which: equals( code ) } ) )
const whenDown = whenKeyCode( 40 )
const whenUp = whenKeyCode( 38 )
const whenEsc = whenKeyCode( 27 )
const whenReturn = whenKeyCode( 13 )
const preventDefault = invoker( 0, 'preventDefault' )
const noop = () => {}

const debug = require( 'debug' )( 'console:ui:dropdown' )

export default class DropDown extends Component {

	constructor( props ) {
		super( props )

		this.state = {
			highlightedIndex: -1,
			selectedIndex: -1,
			isShowingOptions: false
		}
	}

	_template( option ) {
		return <div>{ option }</div>
	}

	_showOptions = () => {
		clearTimeout( this._optionTimer )
		this.setState( { isShowingOptions: true } )
	}

	_hideOptions = () => {
		this._optionTimer = setTimeout( () => {
			this.setState( { isShowingOptions: false } )
		}, 200 )
	}

	_selectOptionIndex = ( index ) => {
		this.setState( { isShowingOptions: false } )
		this.props.onSelect( this.props.options[index], index )
	}

	_highlightOnKeydown = converge( noop, [
		whenDown()( pipe( preventDefault, () => this._highlightNext() ) ),
		whenUp()( pipe( preventDefault, () => this._highlightPrevious() ) ),
		whenEsc()( () => this._hideOptions() ),
		whenReturn()( () => this._selectHighlightedOption() )
	] )

	_highlightNext = () => {
		const { highlightedIndex } = this.state;
		this.setState( { highlightedIndex: ( highlightedIndex + 1 ) % ( this.props.options.length ) } )
	}

	_highlightPrevious = () => {
		const { highlightedIndex } = this.state;
		const next = highlightedIndex - 1
		this.setState( { highlightedIndex: next < 0 ? this.props.options.length - 1 : next } )
	}

	_highlightOptionIndex = ( i ) => {
		debug( 'highlight index', i )
		this.setState( { highlightedIndex: i } )
	}

	_selectHighlightedOption = () => {
		const { highlightedIndex } = this.state
		this._selectOptionIndex( highlightedIndex )
	}

	render() {
		const { options, tabIndex, label } = this.props
		const { highlightedIndex, isShowingOptions } = this.state
		const {
			_showOptions: showOptions,
			_selectOptionIndex: selectOptionIndex,
			_highlightOptionIndex: highlightOptionIndex,
			_hideOptions: hideOptions,
			_highlightOnKeydown: onKeyDown
		} = this

		return (
			<div className="dropdown"
				onFocus={ showOptions }
				onBlur={ hideOptions }
				onKeyDown={ onKeyDown }
				tabIndex={tabIndex}>

				<div className="dropdown-label" onClick={ showOptions }>{ label }</div>

				{ isShowingOptions && <div className="dropdown-options">
					{ addIndex( map )( ( option, index ) => (
						<div className={ classnames( 'dropdown-option', { highlighted: index === highlightedIndex } ) }
							key={ index }
							onMouseOver={ () => highlightOptionIndex( index ) }
							onClick={ () => selectOptionIndex( index ) } >
							{ this._template( option ) }
						</div>
					) )( options ) }
				</div> }

			</div>
		)
	}

}

DropDown.propTypes = {
	options: React.PropTypes.array,
	tabIndex: React.PropTypes.number,
	label: React.PropTypes.string,
	onSelect: React.PropTypes.func
}

DropDown.defaultProps = {
	tabIndex: 0,
	onSelect: () => {}
}
