'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// let symbol = Symbol('name');
// let symbol2 = Symbol('name');
// let symbol3 = Symbol.for('name');
// let symbol4 = Symbol.for('name');
// console.log(symbol === symbol2);
// console.log(symbol2 === symbol3);
// console.log(symbol === symbol3);
// console.log(symbol3 === symbol4);

var user = _defineProperty({
	name: 'bob'
}, Symbol('password'), 'idwed3');

var password = user[Symbol.for('password')];

console.log(password);