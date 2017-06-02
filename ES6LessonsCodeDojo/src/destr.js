let lang = ['js', 'php', 'python', 'ruby'];

//let js, php, py, ruby;

let [js, php, py, ruby] = lang;

let scores = [1, 2, 3];

//let [low, /*mid*/, hi] = scores;

let [low, ...rest] = scores;

function computeScore([low, mid]) {
	console.log(low, mid);
}

computeScore([3, 4]);

let yes = 'yes';
let no = 'no';
[yes, no] = [no, yes];

let person = {
	fName: 'Bob',
	sName: 'Doe'
}

//let {fName, sName} = person;
//or 
let {fnam, sName} = {fName: 'Bob', sName: 'Doe'};

let user = {
	firName: 'Joel',
	lasName: 'mcKinzey',
	social: {
		facebook: 'John Doe',
		twitter: 'JD'
	}
}

let {firName: first, lasName: last, social: {facebook}} = user;
console.log(first, last, facebook);

function post(url, {data: {first,last}, cache}) {
	console.log(data, cache);
}

let res = post('/users', {data: user, cache: false})
