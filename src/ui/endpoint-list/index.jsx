import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSelectedVersion, getSelectedVersionName, getPath } from 'state/selectors'
import { selectVersionEndpoint } from 'state/actions'
import { applySpec, addIndex, map, ifElse, isEmpty, compose, curry } from 'ramda'
import { groupEndpoints, sortScoredEndpoints } from './util'

const debug = require( 'debug' )( 'console:ui:endpoint-list' )

export default class EndpointList extends Component {

	selectEndpoint = id => {
		this.props.selectVersionEndpoint( this.props.version, id )
	}

	template = ( endpoint, index ) => {
		return <li onClick={ () => this.selectEndpoint( endpoint.id ) } key={index}>{ endpoint.path_labeled }</li>
	}

	renderFilteredEndpoints = ( endpoints ) => compose(
		addIndex( map )( this.template ),
		curry( sortScoredEndpoints )( this.props.filter )
	)( endpoints )

	renderGroupedEndpoints = ( endpoints ) => addIndex( map )( this.template )( endpoints )

	renderEndpoints = ( endpoints ) => ifElse(
		() => isEmpty( this.props.filter ),
		this.renderGroupedEndpoints,
		this.renderFilteredEndpoints
	)( endpoints )


	render() {
		const { endpoints: { endpoints } } = this.props
		return (
			<div>
				<h2>Endpoints</h2>
				{ this.renderEndpoints( endpoints ) }
			</div>
		)
	}
}

EndpointList.defaultProps = {
	endpoints: { endpoints: [] },
	filter: ''
}

EndpointList.propTypes = {
	endpoints: React.PropTypes.object,
	version: React.PropTypes.string,
	selectVersionEndpoint: React.PropTypes.func,
	filter: React.PropTypes.string
}

export const Connected = connect( applySpec( {
	endpoints: getSelectedVersion,
	version: getSelectedVersionName,
	filter: getPath
} ), { selectVersionEndpoint } )( EndpointList )
