import { LinkedList } from '../src/utilities/LinkedList.js';

const nextFrame = () => new Promise( resolve => requestAnimationFrame( resolve ) );
const nextTick = () => new Promise( resolve => process.nextTick( resolve ) );

function verifyList( list, expected ) {

	const forward = listToArray( list, false );
	const reverse = listToArray( list, true );

	expect( forward ).toEqual( expected );
	expect( reverse ).toEqual( expected.reverse() );

}

function listToArray( list, reverse = false ) {

	const arr = [];
	let curr = reverse ? list.tail : list.head;
	while ( curr ) {

		arr.push( curr.item );
		curr = reverse ? curr.previous : curr.next;

	}

	return arr;

}

describe( 'LinkedList', () => {

	const A = { str: 'A' };
	const B = { str: 'B' };
	const C = { str: 'C' };
	const D = { str: 'D' };

	it( 'should allow for pushing and popping multiple items', () => {

		const list = new LinkedList();
		expect( list.head ).toEqual( null );
		expect( list.tail ).toEqual( null );
		verifyList( list, [] );

		// push
		list.push( A );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( A );
		verifyList( list, [ A ] );

		list.push( B );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( B );
		verifyList( list, [ A, B ] );

		list.push( C );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( C );
		verifyList( list, [ A, B, C ] );

		list.push( D );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( D );
		verifyList( list, [ A, B, C, D ] );

		// pop
		expect( list.pop() ).toEqual( D );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( C );
		verifyList( list, [ A, B, C ] );

		expect( list.pop() ).toEqual( C );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( B );
		verifyList( list, [ A, B ] );

		expect( list.pop() ).toEqual( B );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( A );
		verifyList( list, [ A ] );

		expect( list.pop() ).toEqual( A );
		expect( list.head ).toEqual( null );
		expect( list.tail ).toEqual( null );
		verifyList( list, [] );

		expect( list.pop() ).toEqual( null );
		expect( list.head ).toEqual( null );
		expect( list.tail ).toEqual( null );
		verifyList( list, [] );

	} );

	it( 'should allow for shifting and unshifting multiple items', () => {

		const list = new LinkedList();
		expect( list.head ).toEqual( null );
		expect( list.tail ).toEqual( null );
		verifyList( list, [] );

		// unshift
		list.unshift( A );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( A );
		verifyList( list, [ A ] );

		list.unshift( B );
		expect( list.head.item ).toEqual( B );
		expect( list.tail.item ).toEqual( A );
		verifyList( list, [ B, A ] );

		list.unshift( C );
		expect( list.head.item ).toEqual( C );
		expect( list.tail.item ).toEqual( A );
		verifyList( list, [ C, B, A ] );

		list.unshift( D );
		expect( list.head.item ).toEqual( D );
		expect( list.tail.item ).toEqual( A );
		verifyList( list, [ D, C, B, A ] );

		// shift
		expect( list.shift() ).toEqual( D );
		expect( list.head.item ).toEqual( C );
		expect( list.tail.item ).toEqual( A );
		verifyList( list, [ C, B, A ] );

		expect( list.shift() ).toEqual( C );
		expect( list.head.item ).toEqual( B );
		expect( list.tail.item ).toEqual( A );
		verifyList( list, [ B, A ] );

		expect( list.shift() ).toEqual( B );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( A );
		verifyList( list, [ A ] );

		expect( list.shift() ).toEqual( A );
		expect( list.head ).toEqual( null );
		expect( list.tail ).toEqual( null );
		verifyList( list, [] );

		expect( list.shift() ).toEqual( null );
		expect( list.head ).toEqual( null );
		expect( list.tail ).toEqual( null );
		verifyList( list, [] );

	} );

	it( 'should allow for insertion and removal', () => {

		const list = new LinkedList();
		list.push( A );
		list.push( B );
		list.push( C );

		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( C );
		verifyList( list, [ A, B, C ] );

		list.insertAfter( D, A );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( C );
		verifyList( list, [ A, D, B, C ] );

		list.remove( B );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( C );
		verifyList( list, [ A, D, C ] );

		list.insertAfter( B, null );
		expect( list.head.item ).toEqual( B );
		expect( list.tail.item ).toEqual( C );
		verifyList( list, [ B, A, D, C ] );

		list.remove( B );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( C );
		verifyList( list, [ A, D, C ] );

		list.insertAfter( B, C );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( B );
		verifyList( list, [ A, D, C, B ] );

		list.remove( B );
		expect( list.head.item ).toEqual( A );
		expect( list.tail.item ).toEqual( C );
		verifyList( list, [ A, D, C ] );

	} );

	it ( 'should throw if adding the same item twice.', () => {

		const list = new LinkedList();
		list.insertAfter( A, null );

		let thrown = false;
		try {

			list.insertAfter( A, null );

		} catch {

			thrown = true;

		}
		expect( thrown ).toBeTruthy();

	} );

	it ( 'should throw if adding before an unadded item.', () => {

		const list = new LinkedList();
		let thrown = false;
		try {

			list.insertAfter( A, B );

		} catch {

			thrown = true;

		}
		expect( thrown ).toBeTruthy();

	} );

	it ( 'should throw if removing an item that has not been added.', () => {

		const list = new LinkedList();
		let thrown = false;
		try {

			list.remove( A );

		} catch {

			thrown = true;

		}
		expect( thrown ).toBeTruthy();

	} );

} );
