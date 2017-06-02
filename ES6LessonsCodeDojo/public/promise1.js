'use strict';

function applyVisa(documents) {
	console.log('application is processed');
	var promise = new Promise(function (resolve, reject) {
		setTimeout(function () {
			Math.random() > 0.5 ? resolve({}) : reject('Visa denied');
		}, 2000);
	});
	return promise;
}

function getVisa(visa) {
	console.info('You got your visa');
	return visa;
}

function bookHotel(visa) {
	// console.log(visa);
	console.log("booking hotel");
	// return {};
	//or make that way
	return Promise.resolve({});
}

function byeTickets(booking) {
	console.log('bye tickets');
	console.log('Ready booked', booking);
}

applyVisa({}).then(getVisa).then(bookHotel).then(byeTickets).catch(function (error) {
	return console.error(error);
});

//applyVisa({}, 
// function(visa) {
// 	console.info('You got your visa');
// 	bookHotel(visa, 
// 		function(reservation) {
// 			byeTickets(reservation, 
// 				function() {

// 				},
// 				function() {

// 				}
// 			)
// 		},
// 		function(error) {

// 		}
// 	)
// },
// function(reason) {
// 	console.error(reason)
// }
//);