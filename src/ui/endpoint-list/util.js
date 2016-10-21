import {
	join,
	groupBy,
	view,
	lensProp,
	assoc,
	map,
	filter,
	pipe,
	not,
	propEq,
	sortBy,
	prop,
	compose,
	subtract,
	concat,
	equals,
	invoker,
	when,
	indexOf,
	split,
	pick,
	values
} from 'ramda'
import LiquidMetal from 'liquidmetal'

const groupLens = view( lensProp( 'group' ) )
export const groupEndpoints = groupBy( groupLens )

const addScore = scorer => map(
	endpoint => assoc( 'score', scorer( endpoint ), endpoint )
)
const endpointFormatForQuery = endpoint => join( ' ',
	concat(
		map(
			when(
				compose( equals( 0 ), indexOf( '$' ) ),
				invoker( 1, 'slice' )( 1 )
			)
		)( split( '/', endpoint.path_labeled ) ),
		concat( pipe( pick( [ 'group', 'description' ] ), values )( endpoint ), [] )
	)
)

const removeZeroScore = filter( pipe( propEq( 'score', 0 ), not ) )
const scoreEndpointWith = query => endpoint => (
	LiquidMetal.score( endpointFormatForQuery( endpoint ), query )
)

export const sortScoredEndpoints = ( query, endpoints ) => pipe(
	addScore( scoreEndpointWith( query ) ),
	removeZeroScore,
	sortBy( compose( subtract( 1 ), prop( 'score' ) ) )
)( endpoints )
