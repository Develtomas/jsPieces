function greater(greeting = 'hello', name = 'Tanya') {
	console.log(`${greeting} ${name}`);
}

greater();

function sum(...values) {
	let z = values.reduce(function(prevValue, currentValue){
		return prevValue + currentValue;
	});

	console.log(z);
}

sum(5,7,12,2,1,0);