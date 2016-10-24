import React from 'react'
import {
	ifElse,
	compose,
	equals,
	head,
	takeWhile,
	not,
	join,
	slice,
	always,
	when,
	prepend,
	tail,
	either,
	length
} from 'ramda'

export const parseSegment = ifElse(
	compose( equals( '/' ), head ),
	token => {
		const segment = takeWhile( compose( not, equals( '$' ) ) )( token )
		return [ join( '', segment ), slice( length( segment ), Infinity, token ) ]
	},
	always( false )
)

export const parseVariable = ifElse(
	compose( equals( '$' ), head ),
	token => {
		const segment = takeWhile( compose( not, equals( '/' ) ) )( token )
		return [ join( '', segment ), slice( length( segment ), Infinity, token ) ]
	},
	always( false )
)

export const transform = fn => input => {
	return [ fn, input ]
}

export const combine = ( l, r ) => tokens => {
	const [ fn, remainder ] = l( tokens )
	return when(
		compose( not, equals( false ) ),
		( [ token, output ] ) => [ fn( token ), output ]
	)( r( remainder ) )
}

export const oneOrMore = parser => input => when(
	compose( not, equals( false ) ),
	( [token, output] ) => {
		const result = oneOrMore( parser )( output )
		if ( !result ) {
			return [ [ token ], output ]
		}
		return [ prepend( token, head( result ) ), tail( result ) ]
	}
)( parser( input ) )

const headIsFalse = either( equals( false ), compose( equals( false ), head ) )
export const orParser = ( l, r ) => token => when(
	headIsFalse,
	() => r( token )
)( l( token ) )

export const parser = ( segment, variable ) => oneOrMore( orParser(
	combine( transform( segment ), parseSegment ),
	combine( transform( variable ), parseVariable )
) )
