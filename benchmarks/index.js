import { runBenchmark } from './utils.js';
import { LinkedList } from '../src/utilities/LinkedList.js';

console.log('LinkedList')
const COUNT = 10000;
let list, items;
runBenchmark( 'push', () => {

	list = new LinkedList();

}, () => {

	for ( let i = 0; i < COUNT; i ++ ) {

		list.push( {} );

	}

});

runBenchmark( 'pop', () => {

	list = new LinkedList();
	for ( let i = 0; i < COUNT; i ++ ) {

		list.push( {} );

	}

}, () => {

	for ( let i = 0; i < COUNT; i ++ ) {

		list.pop();

	}

});

runBenchmark( 'unshift', () => {

	list = new LinkedList();

}, () => {

	for ( let i = 0; i < COUNT; i ++ ) {

		list.unshift( {} );

	}

});

runBenchmark( 'shift', () => {

	list = new LinkedList();
	for ( let i = 0; i < COUNT; i ++ ) {

		list.push( {} );

	}

}, () => {

	for ( let i = 0; i < COUNT; i ++ ) {

		list.shift();

	}

});

runBenchmark( 'splice', () => {

	items = [];
	list = new LinkedList();
	for ( let i = 0; i < COUNT; i ++ ) {

		const item = {};
		list.push( item );
		items.push( item );

	}

}, () => {

	for ( let i = 0; i < COUNT; i ++ ) {

		const item = items[ i ];
		list.remove( item );

	}

});

console.log( 'Array' );

runBenchmark( 'push', () => {

	list = [];

}, () => {

	for ( let i = 0; i < COUNT; i ++ ) {

		list.push( {} );

	}

});

runBenchmark( 'pop', () => {

	list = [];
	for ( let i = 0; i < COUNT; i ++ ) {

		list.push( {} );

	}

}, () => {

	for ( let i = 0; i < COUNT; i ++ ) {

		list.pop();

	}

});

runBenchmark( 'unshift', () => {

	list = [];

}, () => {

	for ( let i = 0; i < COUNT; i ++ ) {

		list.unshift( {} );

	}

});

runBenchmark( 'shift', () => {

	list = [];
	for ( let i = 0; i < COUNT; i ++ ) {

		list.push( {} );

	}

}, () => {

	for ( let i = 0; i < COUNT; i ++ ) {

		list.shift();

	}

});

runBenchmark( 'splice', () => {

	items = [];
	list = [];
	for ( let i = 0; i < COUNT; i ++ ) {

		const item = {};
		list.push( item );
		items.push( item );

	}

}, () => {

	for ( let i = 0; i < COUNT; i ++ ) {

		const item = items[ i ];
		const index = list.indexOf( item );
		list.splice( index, 1 );

	}

});
