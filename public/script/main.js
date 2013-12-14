(function(){
	BULLET_SPEED = 8;
	SPEED        = 3;
	OFFSET_X     = 120;
	OFFSET_Y     = 90;

	WIDTH  = $('#webblaster').width();
	HEIGHT = $('#webblaster').height();
	
	var canvas = $('#webblaster')[0];
	var ctx    = canvas.getContext('2d');

	var x      = 0;
	var y      = 0;
	var left   = false;
	var fired  = new Date();

	var lship = new Image();
	lship.src = 'http://localhost:8000/img/lship.png';

	var rship = new Image();
	rship.src = 'http://localhost:8000/img/rship.png';

	var bullets = [];

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
		if (e.keyCode == 32) states.space = true;

		e.preventDefault();
	}

	var released = function(e) {
		if (e.keyCode == 38) states.up    = false;
		if (e.keyCode == 40) states.down  = false;
		if (e.keyCode == 39) states.right = false;
		if (e.keyCode == 37) states.left  = false;
		if (e.keyCode == 32) states.space = false;

		e.preventDefault();
	}

	$(document).keydown(pressed);
	$(document).keyup(released);

	var update = function() {
		if (states.up) y -= SPEED;
		if (states.down) y += SPEED;
		if (states.left) {
			left = true;
			x -= SPEED;
		}
		if (states.right) {
			left = false;
			x += SPEED;
		}

		var fired_delta = ((new Date().getTime()) - fired.getTime());
		if (states.space && fired_delta > 500) {
			var offsetx = OFFSET_X;
			if (left) offsetx = -offsetx;
			var bullet = {
				left: left,
				x:    x + OFFSET_X,
				y:    y + OFFSET_Y,
			}
			bullets.push(bullet);

			fired = new Date();
		}

		for (var i = bullets.length - 1; i >= 0; i--) {
			var bullet = bullets[i];

			if (bullet.left)  bullet.x -= BULLET_SPEED;
			if (!bullet.left) bullet.x += BULLET_SPEED;
		}
	}

	var render = function() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		ctx.fillStyle = '#FF0000';

		for (var i = bullets.length - 1; i >= 0; i--) {
			var bullet = bullets[i];

			ctx.fillRect(bullet.x, bullet.y, 30, 4);
		};

		var image;
		if (left) image = lship;
		else      image = rship;
		ctx.drawImage(image, x, y);
	}

	setInterval(update, 10);
	setInterval(render, 10);
}());
