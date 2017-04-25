for (var x = 0; x < $("body").width(); x += 60) {
	for (var y = 0; y < $("body").height(); y += 60) {
		$("body").append("<div class='circle-shadow' data-x='" +
			x + "' data-y='" + y + "' style='top:" + y + "px;left:" + x + "px'></div>");
		$("body").append("<div class='circle' data-x='" + x + 
		"' data-y='" + y + "' style='top:" + y + "px;left:" + x + "px'></div>");
	}
}

var $circle = $('.circle');

$circle.on("mouseover mouseout", function (document) {
	var i = $.inArray(event.target, $circle),
		half = $circle.width() / 2,
		x = +$(".circle:eq(" + i + ")").data("x"),
		y = +$(".circle:eq(" + i + ")").data("y"),
		x0 = x + half,
		y0 = y + half,
		dx = document.clientX - x0,
		dy = document.clientY - y0;

	if (event.type == 'mouseover') {
		return Math.sqrt(dx * dx + dy * dy) < $(".circle:eq(" + i + ")").width()
				? (function () {
					$(".circle:eq(" + i + ")").css({
						left: x0 - dx - half + "px",
						top: y0 - dy - half + "px"
					});
				})() 
				: (function () {
					$(".circle:eq(" + i + ")").css({
						left: x0 - half + "px",
						top: y0 - half + "px"
					});
				})();
	}

	else {
		return (function () {
				$(".circle:eq(" + i + ")").addClass("transition");
				$(".circle:eq(" + i + ")").css({
					left: +$(".circle:eq(" + i + ")").data("x") + "px",
					top: +$(".circle:eq(" + i + ")").data("y") + "px"
				});
			})();
	}
	
});