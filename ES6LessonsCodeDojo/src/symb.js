// let symbol = Symbol('name');
// let symbol2 = Symbol('name');
// let symbol3 = Symbol.for('name');
// let symbol4 = Symbol.for('name');
// console.log(symbol === symbol2);
// console.log(symbol2 === symbol3);
// console.log(symbol === symbol3);
// console.log(symbol3 === symbol4);

let user = {
	name: 'bob',
	[Symbol('password')]: 'idwed3'
}

let password = user[Symbol.for('password')];

console.log(password);