'use strict';

var constants = require('./../constants');

var mehStore = Fluxxor.createStore({
	initialize: function() {
		this.bindActions(
			constants.CHANGE_SLIDE, this.onSlideChange,
			constants.CHANGE_HERO_SLIDE, this.onHeroSlideChange,
			constants.COOPERATE, this.onCooperate,
			constants.FORM_COOPERATE_TOGGLE, this.onFormCooperateToggle,
			constants.FORM_APPOINTMENT_TOGGLE, this.onFormAppointmentToggle,
			constants.COOPERATE_COUNTER_CHANGE, this.onCooperateCounterChange,
			constants.SELECT_SERVICE, this.onServiceSelect,
			constants.SERVICE_SELECT_TOGGLE, this.onServiceSelectToggle,
			constants.INIT_INPUTS, this.onInitInputs,
			constants.SUBMIT_FORM, this.onSubmitForm,
			constants.NAV_MOBILE_TOGGLE, this.onNavMobileToggle,
			constants.SCROLL_TO_SECTION, this.onScrollToSection
		);

		// 'ru' or 'en'
		this.language = 'ru';
		this.cooperate = false;
		this.cooperateCounter = 1;
		this.earningsMultiplier = 24600;

		this.formCooperateVisible = false;
		// this.formCooperateValid = false;
		this.formCooperateSent = false;
		this.formAppointmentVisible = false;
		// this.formAppointmentValid = false;
		this.formAppointmentSent = false;
		this.selectedService = 0;

		this.navMobileVisible = false;

		this.weekEarnings = 0;
		this.dict = require('./../dict')[this.language];
		this.heroSlider = {
			slide: {
				index: 0,
				className: 'active'
			},
			prevOutSlide: {
				index: null,
				className: 'prev-out'
			},
			prevInSlide: {
				index: null,
				className: 'prev-in'
			},
			nextOutSlide: {
				index: null,
				className: 'next-out'
			},
			nextInSlide: {
				index: null,
				className: 'next-in'
			}
		};
		// 0 to turn off auto-sliding
		this.heroSliderChangeInterval = 4000;
		this.heroSliderInit();

		this.slider = {
			slide: {
				index: null,
				className: 'active'
			},
			prevOutSlide: {
				index: null,
				className: 'prev-out'
			},
			prevInSlide: {
				index: null,
				className: 'prev-in'
			},
			nextOutSlide: {
				index: null,
				className: 'next-out'
			},
			nextInSlide: {
				index: null,
				className: 'next-in'
			}
		};

		this.onSlideChange(0);

		this.initWheel();
		this.initScroll();
	},
	isMobile: function() {
		return window.innerWidth <= 500;
	},
	initScroll: function() {
		var self = this;

		$(window).scroll(function() {
			if (self.isMobile()) {
				if (window.scrollY >= window.innerHeight - 65 && self.theme !== 'dark') {
					self.theme = 'dark';
					self.emit('change');
				} else if (window.scrollY < window.innerHeight - 65 && self.theme !== null) {
					self.theme = null;
					self.emit('change');
				}
			}
		});
	},
	initWheel: function() {
		var totalDelta = 0;
		var scrollTimeout;
		var moving = false;
		var treshold = 0;
		var self = this;

		var scrollingTime = 1000;

		var moveIt = function() {
			// console.warn('moving for %f', totalDelta);
			moving = true;
			setTimeout(function() {
				moving = false;
			}, scrollingTime);

			var curSlide = self.slider.slide.index;

			if (totalDelta > 0 && curSlide < self.dict.headerNav.length) {
				self.onSlideChange(curSlide + 1);
			} else if (totalDelta < 0 && curSlide > 0) {
				self.onSlideChange(curSlide - 1);
			}
		};

		$(document).on('wheel', function(e) {
			var ev = e.originalEvent;

			if (
				moving ||
				self.formCooperateVisible ||
				self.formAppointmentVisible ||
				self.isMobile() ||
				!ev.deltaY
			) {
				return;
			}

			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(function() {
				// console.warn('done! it\'s %f', totalDelta);
				if (Math.abs(totalDelta) > treshold) {
					moveIt(totalDelta);
				}
				totalDelta = 0;
			}, scrollingTime);

			totalDelta += (ev.deltaY < 0) ? -1 : 1;
			if (Math.abs(totalDelta) > treshold) {
				// console.warn('total is more than %f precisely %f', treshold, totalDelta);
				clearTimeout(scrollTimeout);
				moveIt(totalDelta);
				totalDelta = 0;
			}
		});
	},
	onServiceSelect: function(index) {
		this.selectedService = index;
		this.emit('change');
	},
	onServiceSelectToggle: function(state) {
		if (typeof state !== 'undefined') {
			this.serviceSelectOpen = state;
		} else {
			this.serviceSelectOpen = !this.serviceSelectOpen;
		}
		this.emit('change');
	},
	onSlideChange: function(index) {
		var self = this;
		var curSlide = this.slider.slide.index;

		if (index > curSlide) {
			this.slider.prevOutSlide.index = curSlide;
			this.slider.nextInSlide.index = index;
			setTimeout(function() {
				self.slider.prevOutSlide.index = null;
				self.slider.nextInSlide.index = null;
				self.emit('change');
			}, 1000);
		} else if (index < curSlide) {
			this.slider.prevInSlide.index = curSlide;
			this.slider.nextOutSlide.index = index;
			setTimeout(function() {
				self.slider.prevInSlide.index = null;
				self.slider.nextOutSlide.index = null;
				self.emit('change');
			}, 1000);
		}

		this.slider.slide.index = index;

		if (index > 0) {
			this.theme = 'dark';
			if (this.heroSliderChangeInterval) {
				this.heroSliderTimer.stop();
			}
		} else {
			this.theme = null;
			if (this.heroSliderChangeInterval) {
				this.heroSliderTimer.start();
			}
		}
		this.emit('change');
	},
	heroSliderInit: function() {
		if (this.heroSliderChangeInterval) {
			var self = this;

			self.heroSliderTimer = {
				id: null,
				start: function() {
					self.heroSliderTimer.id = setTimeout(function() {
						self.onHeroSlideChange(self.heroSlider.slide.index + 1);
					}, self.heroSliderChangeInterval);
				},
				stop: function() {
					clearTimeout(self.heroSliderTimer.id);
				},
				restart: function() {
					self.heroSliderTimer.stop();
					self.heroSliderTimer.start();
				}
			};
		}
	},
	onNavMobileToggle: function(state) {
		this.navMobileVisible = state;
		this.emit('change');
	},
	onHeroSlideChange: function(index) {
		var self = this;
		var curSlide = this.heroSlider.slide.index;

		var max = this.dict.heroSlides.length - 1;
		var nextSlide;

		if (index > max) {
			nextSlide = 0;
		} else if (index < 0) {
			nextSlide = max;
		} else {
			nextSlide = index;
		}

		if (index > curSlide) {
			this.heroSlider.prevOutSlide.index = curSlide;
			this.heroSlider.nextInSlide.index = nextSlide;
			setTimeout(function() {
				self.heroSlider.prevOutSlide.index = null;
				self.heroSlider.nextInSlide.index = null;
				self.emit('change');
			}, 1000);
		} else if (index < curSlide) {
			this.heroSlider.prevInSlide.index = curSlide;
			this.heroSlider.nextOutSlide.index = nextSlide;
			setTimeout(function() {
				self.heroSlider.prevInSlide.index = null;
				self.heroSlider.nextOutSlide.index = null;
				self.emit('change');
			}, 1000);
		}

		this.heroSliderTimer.restart();
		this.heroSlider.slide.index = nextSlide;
		this.emit('change');
	},
	onCooperate: function() {
		this.cooperate = true;
		this.weekEarnings = this.cooperateCounter * this.earningsMultiplier;
		this.emit('change');
	},
	toggleForm: function(form, payload) {

		if (this[form + 'Visible'] === payload.state) {
			return;
		}
		if (payload.state === true) {
			var originatesFromForm = false;

			$(payload.DOM[form + 'Element']).on('click.' + form, function(e) {
				originatesFromForm = true;
			});

			var self = this;

			$(document).on('click.' + form, function(e) {
				if (!originatesFromForm) {
					self.flux.actions[form + 'Toggle'](false, payload.DOM);
				}
				originatesFromForm = false;
			});
		} else if (payload.state === false) {
			$(payload.DOM[form + 'Element']).off('.' + form);
			$(document).off('.' + form);
		} else {
			throw new Error('Bad action');
		}
		this[form + 'Visible'] = payload.state;
		this.emit('change');
	},
	onFormCooperateToggle: function(payload) {
		this.toggleForm('formCooperate', payload);
	},
	onFormAppointmentToggle: function(payload) {
		this.toggleForm('formAppointment', payload);
	},
	onCooperateCounterChange: function(amount) {
		this.cooperateCounter += amount;
		if (this.cooperateCounter < 1) {
			this.cooperateCounter = 1;
		} else if (this.cooperateCounter > 12) {
			this.cooperateCounter = 12;
		}
		this.emit('change');
	},
	onSubmitForm: function(payload) {
		var self = this;
		var form = payload.DOM[payload.form];

		$.ajax({
			dataType: 'json',
			data: $(form).serialize(),
			type: form.method || 'post',
			url: form.action || '/',
			success: function(data) {
				self[payload.form + 'Sent'] = true;
				self.emit('change');
			},
			error: function(err) {
				debugger;
			},
			complete: function() {

			}
		});
	},
	validateForm: function(form, DOM) {
		var self = this;
		var container;
		var $container;
		var form = DOM[form];

		if (form instanceof $) {
			container = form[0];
			$container = form;
			if (!container) {
				console.error('form validation: Empty jQuery object');
				return;
			}
		} else if (form instanceof HTMLElement) {
			container = form;
			$container = $(form);
		} else {
			console.error('form validation: Argument is not a container. Must be called with HTMLElement or jQuery object');
			return;
		}

		var $fields = $container.find('[required]');

		if (!$fields[0]) {
			console.error('form validation: no required fields found');
			return;
		}

		if ('noValidate' in container) {
			if (!container.noValidate) {
				console.error('form validation: the form has no noValidate attribute');
			}
		} else {
			var $form = $container.find('form');

			if ($form.length > 1) {
				console.error('form validation: more than one form found');
				return;
			} else {
				if (!$form[0].noValidate) {
					console.error('form validation: the form has no noValidate attribute');
				}
			}
		}

		$container.removeClass('invalid invalid-check invalid-select invalid-text invalid-email invalid-phone');

		$fields
			.off('.checkValidity')
			.on('input.checkValidity change.checkValidity', function() {
				$(this).removeClass('invalid invalid-check invalid-select invalid-text invalid-email invalid-phone');
			});

		var valid = true;
		var firstFocused = false;
		var emailRegexp = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);

		var markInvalid = function(className) {
			var $input = $(this);

			$input.addClass('invalid invalid-' + className);
			$input.siblings('.input-error').attr('data-validation-message', self.dict.validationMessage[className]);
			$container.addClass('invalid invalid-' + className);

			valid = false;
			if (!firstFocused) {
				$input.focus();
				firstFocused = true;
			}
		};

		$fields
			.filter('.invalid').removeClass('invalid').end()
			.each(function() {
				var type = this.type;
				if (type === 'checkbox' && !this.checked) {
					markInvalid.call(this, 'check');
					return;
				}

				if ((type === 'select-one' || type === 'select-multiple') && !~this.selectedIndex) {
					markInvalid.call(this, 'select');
					return;
				}

				if (!$.trim(this.value)) {
					markInvalid.call(this, 'text');
					return; // !!!
				}

				if (this.type === 'email' && !this.value.match(emailRegexp)) {
					markInvalid.call(this, 'email');
				}

				if (this.type === 'tel' && !this.value.match(new RegExp(this.getAttribute('data-regexp')))) {
					markInvalid.call(this, 'tel');
				}
			});

		// add valid state stuff
		return valid;
	},
	onInitInputs: function(payload) {

		var $inputs = $(payload.DOM[payload.form]).find('input');

		var checkInput = function() {
			if ($.trim(this.value).length > 0) {
				$(this).removeClass('empty').addClass('filled');
			} else {
				$(this).removeClass('filled').addClass('empty');
			}
		};

		$inputs
			.each(function() {
				checkInput.call(this);
			})
			.on('input', function() {
				checkInput.call(this);
			});

		var mask = require('./../mask.js');

		mask(payload.DOM[payload.phoneInput], checkInput);
	},
	onScrollToSection: function(index) {
		var $sections = $('.content-slide');
		var section = $sections[index];

		if (section) {
			window.scrollTo(window.scrollX, section.offsetTop);
			this.navMobileVisible = false;
			this.emit('change');
		} else {
			console.warn('section with index %i not found!', index);
		}
	},
	getState: function() {
		return {
			slider: this.slider,
			heroSlider: this.heroSlider,
			theme: this.theme,
			cooperate: this.cooperate,
			formCooperateVisible: this.formCooperateVisible,
			formCooperateSent: this.formCooperateSent,
			formAppointmentVisible: this.formAppointmentVisible,
			formAppointmentSent: this.formAppointmentSent,
			cooperateCounter: this.cooperateCounter,
			weekEarnings: this.weekEarnings,
			selectedService: this.selectedService,
			serviceSelectOpen: this.serviceSelectOpen,
			navMobileVisible: this.navMobileVisible
		};
	}
});

module.exports = mehStore;