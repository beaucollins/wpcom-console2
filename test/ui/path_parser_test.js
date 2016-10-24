import { equal, ok, deepEqual } from 'assert'
import { shallow } from 'enzyme'
import {
	parseSegment,
	parseVariable,
	parser
} from 'ui/path-editor/util'
import {
	compose,
	map
} from 'ramda'

describe( 'path parser', () => {
	// a pasert takes a tokesn -> result, token

	it( 'should parse path segments', () => {
		const path = '/one/$variable/other/$thing'
		const [ result, rest ] = parseSegment( path )
		equal( rest, '$variable/other/$thing' )
		equal( result, '/one/' )
	} )

	it( 'should parse variable segment', () => {
		const path = '$variable/other/$thing'
		const [ result, rest ] = parseVariable( path )
		equal( rest, '/other/$thing' )
		equal( result, '$variable' )
	} )

	it( 'should parse whole path', () => {
		let [ result ] = parser(
			v => `segment: ${v}`,
			v => `variable: ${v}`
		)( '/front/$path/end/' )
		deepEqual( result, [
			'segment: /front/',
			'variable: $path',
			'segment: /end/'
		] )
	} )

	it( 'should fail to parse path segment', () => {
		ok( ! parseSegment( 'a' ) )
	} )
} )
