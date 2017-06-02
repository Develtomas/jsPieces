'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var lang = ['js', 'php', 'python', 'ruby'];

//let js, php, py, ruby;

var js = lang[0],
    php = lang[1],
    py = lang[2],
    ruby = lang[3];


var scores = [1, 2, 3];

//let [low, /*mid*/, hi] = scores;

var low = scores[0],
    rest = scores.slice(1);


function computeScore(_ref) {
	var _ref2 = _slicedToArray(_ref, 2),
	    low = _ref2[0],
	    mid = _ref2[1];

	console.log(low, mid);
}

computeScore([3, 4]);

var yes = 'yes';
var no = 'no';
var _ref3 = [no, yes];
yes = _ref3[0];
no = _ref3[1];


var person = {
	fName: 'Bob',
	sName: 'Doe'
};

//let {fName, sName} = person;
//or 
var _fName$sName = { fName: 'Bob', sName: 'Doe' },
    fnam = _fName$sName.fnam,
    sName = _fName$sName.sName;


var user = {
	firName: 'Joel',
	lasName: 'mcKinzey',
	social: {
		facebook: 'John Doe',
		twitter: 'JD'
	}
};

var first = user.firName,
    last = user.lasName,
    facebook = user.social.facebook;

console.log(first, last, facebook);

function post(url, _ref4) {
	var _ref4$data = _ref4.data,
	    first = _ref4$data.first,
	    last = _ref4$data.last,
	    cache = _ref4.cache;

	console.log(data, cache);
}

var res = post('/users', { data: user, cache: false });