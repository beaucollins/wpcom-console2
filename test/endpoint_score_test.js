import { deepEqual, equal, fail } from 'assert'
import { groupEndpoints, sortScoredEndpoints } from 'ui/endpoint-list/util'
import { map } from 'ramda'
import LiquidMetal from 'liquidmetal'
import fixture from './endpoint-fixture'

describe( 'Endpoint scores', () => {
	let endpoints

	const greaterThan = ( largerValue, smallerValue ) => {
		if ( largerValue > smallerValue ) {
			return
		}
		fail( largerValue, smallerValue, `${largerValue} is not greater than ${smallerValue}`, '>' )
	}

	beforeEach( () => {
		endpoints = fixture.slice()
	} )

	it( 'should score text', () => {
		greaterThan( LiquidMetal.score( 'some text', 'st' ), 0 )
	} )

	it( 'should group endpoints', () => {
		deepEqual(
			map( ( v ) => v.length, groupEndpoints( endpoints ) ),
			{ batch: 1, media: 2, posts: 2, read: 16, sites: 2, tests: 1, users: 1 }
		)
	} )

	it( 'should sort endpoints by score', () => {
		const scored = sortScoredEndpoints( 'rfme', endpoints )
		const [ first ] = scored

		equal( scored.length, 5 )
		scored.forEach( ( { score } ) => greaterThan( score, 0 ) )
		equal( first.path_labeled, '/read/following/mine/export' )
	} )
} )
