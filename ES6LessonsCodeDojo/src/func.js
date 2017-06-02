let add = (x, y) => x + y;

let square = x => x * x;

let answer = () => 'ddydish!'

let log = () => console.log('dede2');
log();

let namePer = () => ({ name: 'Joel' });
//Similar exp
(function() {
	console.log('fun1');
})();
//=
(() => console.log('fun2'))();

let numbers = [1,2,3,5,7, 10, -2, 5];

let sum = 0;

numbers.forEach(num => sum += num);

let sqr = numbers.map(num => num * num);

let person = {
	name: 'Jacob',
	lastName: function() {
		(() => console.log(this.name))();
	}
}

//arrow function cant be used in constructors