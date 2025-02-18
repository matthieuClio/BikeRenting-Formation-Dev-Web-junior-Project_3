"use strict";

// Class Canvas
//...
//...
//...

class Canvas {

	constructor() {
		this.booking_dataElt = document.getElementById("address_st"); // Booking adress
		this.input_nameElt = document.getElementById("name");
		this.input_first_nameElt = document.getElementById("firstName");
		this.inputDeleteElt = document.getElementById("input_deleteId");
		this.canvasElt = document.querySelector("canvas");
		this.canvas_container = document.getElementById("canvas_container");
		this.error_message = document.getElementById("error_message");
		this.input_delete = document.getElementById("input_deleteId");
		this.booking_sectionElt = document.getElementById("booked"); // Booking location
		this.timerSectionElt = document.getElementById("timer_section");
		this.timerElt = document.getElementById("timer");
		this.minElt = document.getElementById("min");
		this.secElt = document.getElementById("sec");
		this.context = this.canvasElt.getContext('2d');
		this.radius = 5;
		this.dragging = false;
		this.timerMin = 20;
		this.timerSec = '00';
    }

    // Method running
    running() {

		this.canvas_container.style.display = "block";
		this.canvasElt.width = window.innerWidth;
		this.canvasElt.height = "500";
		this.context.lineWidth = this.radius*2;

		if (screen.width > 1279) {
			// Event mouse on canvas
			this.canvasElt.addEventListener('mousedown', this.enalble.bind(this));
			this.canvasElt.addEventListener('mousedown', this.putPoint.bind(this));
			this.canvasElt.addEventListener('mousemove', this.putPoint.bind(this));
			this.canvasElt.addEventListener('mouseup', this.disable.bind(this));
			this.canvasElt.addEventListener('mouseout', this.disable.bind(this));
		}

		// Dragging for tablet - Mobile
		else if (screen.width <= 1279) {

			// Event tactile on canvas
			this.canvasElt.addEventListener('touchstart', this.enalble.bind(this));
			this.canvasElt.addEventListener('touchmove', this.putPoint.bind(this));
			this.canvasElt.addEventListener('touchend', this.disable.bind(this));
		}

    } // End running()

    // Method cancelCanvas
    cancelCanvas() {
    	this.canvas_container.style.display = "none";
    }

    // Method resetText
    resetText() {
    	this.error_message.textContent = "";
    }

    // Method resize
    resize() {
		this.canvasElt.width = window.innerWidth;
		this.canvasElt.height = "500";
		this.context.lineWidth = this.radius*2;
    }

    // Method validationCanvas
    validationCanvas() {
		this.canvas_container.style.display = "none";
    }
    
    // Method errorCanvas
    errorCanvas() {
    	this.error_message.textContent = "Vous devez signer pour valider";
    }

    // Method deleteBooking
    deleteBooking() {
		this.booking_sectionElt.textContent = "Pas de réservation";
		this.input_delete.style.display = "none";
		this.timerSectionElt.style.display = "none";
		sessionStorage.clear();
    }

    // Method addBooking
    addBooking() {

    	// Define some variable for be used on a function
		let input_nameElt = this.input_nameElt;
		let input_first_nameElt = this.input_first_nameElt;
		let booking_dataElt = this.booking_dataElt;
		let minElt = this.minElt;
		let secElt = this.secElt;
		let timerElt = this.timerElt;
		let timerMin = this.timerMin;
		let timerSec = this.timerSec;
		let booking_sectionElt = this.booking_sectionElt;
		let timerSectionElt = this.timerSectionElt;
		let inputDeleteElt = this.inputDeleteElt;


    	function booking() {

			localStorage.setItem("name", input_nameElt.value);
			localStorage.setItem("first_name", input_first_nameElt.value);
			sessionStorage.setItem("booking", booking_dataElt.textContent + ", Réservé par: " + input_nameElt.value + " " + input_first_nameElt.value);
			sessionStorage.setItem("timerMin", timerMin);
			sessionStorage.setItem("timerSec", timerSec);

			booking_sectionElt.textContent = sessionStorage.booking;
			timerElt.textContent = "Temps restant: ";
			minElt.textContent = sessionStorage.timerMin + " min ";
			secElt.textContent = sessionStorage.timerSec + "s ";

			timerSectionElt.style.display = "block";
			inputDeleteElt.style.display = "inline-block";
		}

		setTimeout(function() {
			booking(this.input_nameElt, this.input_first_nameElt, this.booking_dataElt, this.minElt, this.secElt, this.timerElt, this.timerMin, this.timerSec, 
			this.booking_sectionElt, this.inputDeleteElt, this.timerSectionElt);
			

		}, 1500); // Have time to delete a booking before adding

	} // End method addBooking

	// Method enalble
	enalble(e) {
		this.dragging = true;
		this.putPoint(e);
	}

	// Method putPoint
	putPoint(e) {

		if(this.dragging) {

			if (screen.width > 1279) {
				this.context.lineTo(e.clientX, e.clientY);
				this.context.stroke();
				this.context.beginPath();
				this.context.arc(e.clientX, e.clientY, this.radius, 0, Math.PI*2);
				this.context.fill();
				this.context.beginPath();
				this.context.moveTo(e.clientX, e.clientY);
			}
			else if (screen.width <= 1279) {
				e.preventDefault();
				this.context.lineTo(e.touches[0].clientX, e.touches[0].clientY);
				this.context.stroke();
				this.context.beginPath();
				this.context.arc(e.touches[0].clientX, e.touches[0].clientY, this.radius, 0, Math.PI*2);
				this.context.fill();
				this.context.beginPath();
				this.context.moveTo(e.touches[0].clientX, e.touches[0].clientY);
			}
		}	// End dragging
	}	// End function putPoint

	// Method disable
	disable() {
		this.dragging = false;
		this.context.beginPath();
	}

} // End class Canvas