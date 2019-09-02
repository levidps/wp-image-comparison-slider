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
					initLabels(container);
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

	function initLabels(container) {
		if ( container.dataset.showLabels ) {
			let beforeLabel	= container.dataset.beforeLabel? container.dataset.beforeLabel : 'Before';
			let afterLabel	= container.dataset.afterLabel? container.dataset.afterLabel : 'After';

			// Create && append before label
			const before 	= document.createElement("P");
			const beforeTxt	= document.createTextNode(beforeLabel);
			before.appendChild(beforeTxt);
			before.className += 'img-comp__label img-comp__label__before';
			container.appendChild(before);

			// Create && append after label
			const after		= document.createElement("P");
			const afterTxt	= document.createTextNode(afterLabel);
			after.appendChild(afterTxt);
			after.className += 'img-comp__label img-comp__label__after';
			container.appendChild(after);
		}
	}

	function compareImages(container) {
		let slider; 
		let clicked = 0;
		let w;
		let h;
		let img = container.querySelector('.img-comp-overlay');
		let start = 50;
		let uiVerticalPlacement = 50;

		/* Set Horizontal Placement of slider UI */
		if ( container.dataset.comparisonStart ) {
			start = parseInt(container.dataset.comparisonStart); }

		/* Set Vertical Placement of slider UI */
		if ( container.dataset.uiVerticalPlacement) {
			uiVerticalPlacement = parseInt(container.dataset.uiVerticalPlacement); }

		container.style.height = img.offsetHeight + 'px';

		/* Get the width and height of the img element */
		w = img.offsetWidth;
		h = img.offsetHeight;

		/* Set the width of the img element to 50%: */
		img.style.width = (w * (start / 100)) + "px";

		/* Create slider: */
		slider = document.createElement("DIV");
		slider.setAttribute("class", "img-comp-slider");

		/* Insert slider */
		img.parentElement.insertBefore(slider, img);

		/* Position the slider */
		slider.style.top = (h * (uiVerticalPlacement / 100)) - (slider.offsetHeight / 2) + "px";
		slider.style.left = (w * (start / 100)) - (slider.offsetWidth / 2) + "px";

		container.classList.add('state_active');
		setTimeout(() => {
			container.classList.remove('state_loading');
		}, 1000);


		/**
		  * CREDITS:
		  *
		  * Event Listeners improved using before/after by @ArekPastuszka
		  * https://github.com/ArekPastuszka/before-after
		  *
		  */
		/* MouseDown/TouchStart listeners */
        'mousedown touchstart'.split(' ').forEach(function(evt) {
            slider.addEventListener(evt, function (e) {
            	/* Stop default events from occuring */
                e.preventDefault();
                e.stopPropagation();

                /* Inita Clicking :) */
                slideReady();
            });
        });

        /* MouseUp/TouchEnd listeners */
        'mouseup touchend'.split(' ').forEach(function (evt) {
            document.addEventListener(evt, function () {
            	/* Stop slide functions */
                slideFinish();
            });
        });

		/* MouseMove/TouchMove listeners */
        'mousemove touchmove'.split(' ').forEach(function (evt) {
            container.addEventListener(evt, function (e) {
            	/* if `clicked` then calculate/move */
                if(clicked){
                    var moveX = evt === 'touchmove' ? e.changedTouches[0].clientX : e.clientX;
                    slide(moveX);
                }
            });
        });

		function slideReady(e) {
			/* The slider is now clicked and ready to move: */
			container.classList.add('img-comp-container--dragging');
			clicked = 1;
		}

		function slideFinish() {
			/* The slider is no longer clicked: */
			container.classList.remove('img-comp-container--dragging');
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