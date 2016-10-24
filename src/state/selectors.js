import { path, keys, compose, view, lensProp, lensIndex, equals, when, always, propEq, find } from 'ramda'

export const getVersions = path( [ 'endpoints', 'versions' ] )
export const getVersionNames = compose( keys, getVersions )
export const getSelectedVersionName = path( [ 'endpoints', 'selected_version' ] )

export const getSelectedVersion = state => when(
	equals( undefined ),
	always( { endpoints: [] } )
)( view( lensProp( getSelectedVersionName( state ) ), getVersions( state ) ) )

export const getSelectedVersionEndpointIndex = state => view( lensProp( 'selected' ), getSelectedVersion( state ) )
export const getSelectedEndpointId = path( [ 'endpoints', 'selected_endpoint' ] )
export const getSelectedVersionEndpoint = state => find(
	propEq( 'id', getSelectedEndpointId( state ) ),
	view( lensProp( 'endpoints' ), getSelectedVersion( state ) )
)

export const getLog = path( [ 'log' ] )
export const getPath = path( [ 'request', 'path' ] )

export const getRequest = path( [ 'request' ] )