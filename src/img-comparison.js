function initComparisons() {
	let containers;

	/* Find all elements with an "overlay" class: */
	containers = document.getElementsByClassName("img-comp-container");
	for (let container of containers) {
		/* Once for each "overlay" element:
		pass the "overlay" element as a parameter when executing the compareImages function: */
		loadImages(container);
	}

	function loadImages(container) {
		let x;
		let y;
		let images = container.querySelectorAll('img');
		container.classList.add('state_loading');

		for (let i = 0; i < images.length; i++) {
			let current = images[i];

			if ( i === images.length -1 ) {
				current.onload = function() {
					compareImages(container);
					setTimeout(() => {
						this.style.height = y + 'px';
						this.style.maxWidth = x + 'px';
					}, 100);
				};
			} else {
				current.onload = function() {
					y = this.offsetHeight > y ? y : this.offsetHeight;
					x = this.offsetWidth > x ? x : this.offsetWidth;
				}
			}

			current.src = current.dataset.src;
		}
	}

	function compareImages(container) {
		let slider; 
		let clicked = 0;
		let w;
		let h;
		let img = container.querySelector('.img-comp-overlay');

		container.style.height = img.offsetHeight + 'px';

		/* Get the width and height of the img element */
		w = img.offsetWidth;
		h = img.offsetHeight;

		/* Set the width of the img element to 50%: */
		img.style.width = (w / 2) + "px";

		/* Create slider: */
		slider = document.createElement("DIV");
		slider.setAttribute("class", "img-comp-slider");

		/* Insert slider */
		img.parentElement.insertBefore(slider, img);

		/* Position the slider in the middle: */
		slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
		slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

		container.classList.add('state_active');
		setTimeout(() => {
			container.classList.remove('state_loading');
		}, 1000);

		/* Execute a function when the mouse button is pressed: */
		slider.addEventListener("mousedown", slideReady);

		/* And another function when the mouse button is released: */
		window.addEventListener("mouseup", slideFinish);

		/* Or touched (for touch screens: */
		slider.addEventListener("touchstart", slideReady);

		/* And released (for touch screens: */
		window.addEventListener("touchstop", slideFinish);

		/* And Cancel Touch (to celear the touch screen issue) */
		window.addEventListener("touchcancel", slideFinish, false);

		function slideReady(e) {
			/* Prevent any other actions that may occur when moving over the image: */
			e.preventDefault();
			/* The slider is now clicked and ready to move: */
			clicked = 1;
			/* Execute a function when the slider is moved: */
			window.addEventListener("mousemove", slideMove);
			window.addEventListener("touchmove", slideMove);
		}

		function slideFinish() {
			/* The slider is no longer clicked: */
			clicked = 0;
		}

		function slideMove(e) {
			let pos;
			/* If the slider is no longer clicked, exit this function: */
			if (clicked === 0) return false;
			/* Get the cursor's x position: */
			pos = getCursorPos(e);
			/* Prevent the slider from being positioned outside the image: */
			if (pos < 0) pos = 0;
			if (pos > w) pos = w;
			/* Execute a function that will resize the overlay image according to the cursor: */
			slide(pos);
		}

		function getCursorPos(e) {
			let a;
			let x = 0;
			e = e || window.event;
			/* Get the x positions of the image: */
			a = img.getBoundingClientRect();
			/* Calculate the cursor's x coordinate, relative to the image: */
			x = e.pageX - a.left;
			/* Consider any page scrolling: */
			x = x - window.pageXOffset;
			return x;
		}

		function slide(x) {
			/* Resize the image: */
			img.style.width = x + "px";
			/* Position the slider: */
			slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
		}
	}
}
window.addEventListener('onload', initComparisons(), false );