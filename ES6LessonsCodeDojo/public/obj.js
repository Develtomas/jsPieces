'use strict';

var name = 'clifford',
    lastname = 'simon';

var pers = {
	name: name,
	lastname: lastname,
	gret: function gret() {
		console.log('hello ' + this.name);
	},

	get fullname() {
		return this.name + ' ' + this.lastname;
	},
	set fullname(value) {
		this.name = value;
		return this.name + ' ' + this.lastname;
	}
};

console.log(pers.fullname);

// pers.gret();

// function createCar(property, value) {
// 	return {
// 		[property]: value,
// 		['_' + property]: value,
// 		['get' + property]() {
// 			return this[property];
// 		}
// 	}
// }

// console.log(createCar('COLOR', 1));