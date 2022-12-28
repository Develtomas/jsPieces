const timeleft = function() {
	// add modal window to page
	const injectPopup = document.createElement('div');
	injectPopup.className = 'popup__bg';
	injectPopup.innerHTML = '<div class="popup"><button class="close-popup">One minute left !</button></div>';
	document.body.appendChild(injectPopup);
}


const notificate = function() {
	// create notification
	const notif = new Notification("Message from Magnit CRM!", {
		body: "Only ONE minute left, hurry up!",
		icon: "https://www.svgrepo.com/show/275972/magnet.svg"
	});
}


const addLogic = function() {
	// variables related to modal window
	let popupBg = document.querySelector('.popup__bg');
	let popup = document.querySelector('.popup');
	let closePopupButton = document.querySelector('.close-popup');

	// notification block
	if (Notification.permission === 'default') {
		Notification.requestPermission().then(permission => {
			console.log(`Notifications are: ${permission}`);
		});
	} 
	else {console.log(`Notifications are: ${Notification.permission}`);}

	// variable related to innerText
	let timetext = document.querySelector('span.deadline__timeout-date');

	// change text listener
	if (timetext) {
		timetext.addEventListener('DOMSubtreeModified', (e) => {
			let str = e.target.data;

			// prevent error
			if (str) {
				str = str.replace(/\D/g,'');
			}

			// activate/close modal
			if(str === '1') {
				e.preventDefault();
				popupBg.classList.add('active');
				popup.classList.add('active');
				if (Notification.permission === 'granted') {
					notificate();
				}
			}
			else {
				popupBg.classList.remove('active');
				popup.classList.remove('active');
			}
		});
	} else { console.log('no timer element!'); }

	// close button listener
	closePopupButton.addEventListener('click',() => {
		popupBg.classList.remove('active');
		popup.classList.remove('active');
	});
	
	// bg click close listener
	document.addEventListener('click', (e) => {
		if(e.target === popupBg) {
			popupBg.classList.remove('active');
			popup.classList.remove('active');
		}
	});
}


document.addEventListener('readystatechange', (e) => {
	console.log('statechange');
	if (document.readyState === 'interactive' || document.readyState === 'complete') {
		timeleft();
		setTimeout(addLogic, 2000);
	}
});