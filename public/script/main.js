(function(){
	WIDTH = $('#webblaster').width();
 	HEIGHT = $('#webblaster').height();
	
  	var canvas = $('#webblaster')[0];
	var ctx    = canvas.getContext('2d');

	var x     = 0;
	var y     = 0;
	var left  = false;

	var shipLeft = new Image();
	shipLeft.src = '/img/ship.png';

	var states = {
		up: false,
		down: false,
		left: false,
		right: false,
	};

	var pressed = function(e) {
		if (e.keyCode == 38) states.up    = true;
		if (e.keyCode == 40) states.down  = true;
		if (e.keyCode == 39) states.right = true;
		if (e.keyCode == 37) states.left  = true;
	}

	var released = function(e) {
		if (e.keyCode == 38) states.up    = false;
		if (e.keyCode == 40) states.down  = false;
		if (e.keyCode == 39) states.right = false;
		if (e.keyCode == 37) states.left  = false;
	}

	$(document).keydown(pressed);
	$(document).keyup(released);

	var update = function() {
		if (states.up) y--;
		if (states.down) y++;
		if (states.left) {
			left = true;
			x--;
		}
		if (states.right) {
			left = false;
			x++;
		}
	}

	var render = function() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		ctx.drawImage(shipLeft, x, y);
	}

	setInterval(update, 10);
	setInterval(render, 10);
}());