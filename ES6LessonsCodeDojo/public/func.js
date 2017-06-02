'use strict';

var add = function add(x, y) {
	return x + y;
};

var square = function square(x) {
	return x * x;
};

var answer = function answer() {
	return 'ddydish!';
};

var log = function log() {
	return console.log('dede2');
};
log();

var namePer = function namePer() {
	return { name: 'Joel' };
};
//Similar exp
(function () {
	console.log('fun1');
})();
//=
(function () {
	return console.log('fun2');
})();

var numbers = [1, 2, 3, 5, 7, 10, -2, 5];

var sum = 0;

numbers.forEach(function (num) {
	return sum += num;
});

var sqr = numbers.map(function (num) {
	return num * num;
});

var person = {
	name: 'Jacob',
	lastName: function lastName() {
		var _this = this;

		(function () {
			return console.log(_this.name);
		})();
	}
};

//arrow function cant be used in constructors