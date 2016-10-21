import React, { Component } from 'react'
import { connect } from 'react-redux'
import { map, addIndex, applySpec } from 'ramda'
import { getLog as requests } from 'state/selectors'

export default class Log extends Component {
	render() {
		return (
			<div>
				<h4>Request Log</h4>
				<ul>
					{ addIndex( map )( ( request, index ) => <li key={index}>{ request.id } Hello</li> )( this.props.requests ) }
				</ul>
			</div>
		)
	}
}

Log.propTypes = {
	requests: React.PropTypes.array
}

Log.defaultProps = {
	requests: []
}

export const Connected = connect( applySpec( { requests } ) )( Log )
