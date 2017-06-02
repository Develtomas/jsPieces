'use strict';

var movList = document.getElementById('#movie');

function addMovieToList(movie) {
	var img = document.createElement("img");
	img.src = movie.Poster;
	movList.appendChild(img);
}

var search = 'spider man';

function getData(url) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function () {
			if (xhr.status === 200) {
				var json = JSON.parse(xhr.response);
				resolve(json.search);
			} else {
				reject(xhr.statusText);
			}
		};

		xhr.onerror = function (error) {
			reject(error);
		};

		xhr.send();
	});
}

getData('https://www.omdbapi.com/?s=' + search).then(function (movies) {
	return movie.array.forEach(function (movie) {
		return addMovieToList(movie);
	});
}).catch(function (error) {
	return console.error(error);
});