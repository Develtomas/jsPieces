//bookmarklet code
javascript:(function(a){a.body.appendChild(a.createElement('script')).src='origin'})(document);

//main code
$(document).ready(function () {
	var c,m, today, fd;
	today = new Date();
	fd = ('0' + today.getDate()).slice(-2) + '/' + ('0' + (today.getMonth() + 1)).slice(-2) 
	+ '/' + today.getFullYear();
    $.ajax({
        type: "GET",
        url: "https://www.cbr.ru/scripts/XML_daily.asp",
        dataType: "xml",
        success: curParser
    });
	$.ajax({
        type: "GET",
        url: "https://www.cbr.ru/scripts/xml_metall.asp?date_req1=" + fd + "&date_req2=" + fd,
        dataType: "xml",
        success: metParser
    });
});

function curParser(xml) {
	c = $(xml).find('Valute[ID=R01235]').find("Value").text();
}

function metParser(xml) {
    m = $(xml).find('Record[Code=1]').find("Sell").text();
}

function digit(x) {
	var d = x.replace(",",".");
	d = parseFloat(d);
	return d;
}

$(document).ajaxStop(function() {
	var res = digit(m) * 1000 / digit(c);
	res = Math.round(res * 100) / 100;
	$("body")
	.append('<p id="exrate" style="display: block; position: absolute; top: 0; right: 0; background-color: #FFCC00; padding: 20px 20px; z-index: 3;">1 kilogram of gold costs ' + res + ' USD<p>');
});

$("body").delegate("#exrate", "click", function() {
	$(this).fadeOut();
});