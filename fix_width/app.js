 document.addEventListener('readystatechange', (e) => {
	if (document.readyState === 'interactive' || document.readyState === 'complete') {
		let d=document.getElementsByClassName('table-abbreviated__wrap');
		for(var i=0;i<d.length;i++) {
			d[i].style.cssText = "max-width: 100%";
		};
	}
});