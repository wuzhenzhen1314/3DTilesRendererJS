function pad( str, len ) {

	while ( str.length < len ) {

		str += ' ';

	}

	return str;

}

function runBenchmark( name, preFunc, func, maxTime = 3000, maxIterations = 5000 ) {

	let iterations = 0;
	let elapsed = 0;
	while ( elapsed < maxTime ) {

		if ( preFunc ) preFunc();
		let start = Date.now();
		func();
		elapsed += Date.now() - start;

		iterations ++;
		if ( iterations >= maxIterations ) break;

	}

	console.log( `\t${ pad( name, 30 ) }: ${ parseFloat( ( elapsed / iterations ).toFixed( 6 ) ) } ms` );

}

export { runBenchmark };
