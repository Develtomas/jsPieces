let movList = document.getElementById('#movie');

function addMovieToList(movie) {
	let img = document.createElement("img");
	img.src = movie.Poster;
	movList.appendChild(img);
}

let search = 'spider man';

function getData(url) {
	return new Promise(function(resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function() {
			if (xhr.status === 200) {
				let json = JSON.parse(xhr.response);
				resolve(json.search);
			}
			else {
				reject(xhr.statusText);
			}
		};

		xhr.onerror = function(error) {
			reject(error);
		};

		xhr.send();
	});
}

getData(`https://www.omdbapi.com/?s=${search}`)
	.then(movies => 
		movie.array.forEach(movie => 
				addMovieToList(movie)))
	.catch(error => console.error(error));