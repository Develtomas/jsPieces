'use strict';

function greater() {
	var greeting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hello';
	var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Tanya';

	console.log(greeting + ' ' + name);
}

greater();

function sum() {
	for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
		values[_key] = arguments[_key];
	}

	var z = values.reduce(function (prevValue, currentValue) {
		return prevValue + currentValue;
	});

	console.log(z);
}

sum(5, 7, 12, 2, 1, 0);