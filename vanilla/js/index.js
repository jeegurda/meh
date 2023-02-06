'use strict';

var App = function(dict) {

	if (!dict) {
		console.warn('Dictionary is empty or missing');
	}

	var self = this;

	var DOM = {
		root: $('.meh'),
		slides: $('.content-slide'),
		sliderControls: $('.content-controls li'),
		headerNav: $('.h-nav li'),
		heroSlides: $('.chs-slide'),
		heroSliderControls: $('.chs-controls li'),
		heroSliderTexts: $('.chs-text'),
		serviceSelect: $('.service-select'),
		services: $('.ssd-item'),
		navMobile: $('.nav-mobile'),
		earnings: $('.ccm-result'),
		counter: $('.ccm-counter'),
		cooperate: $('.cc-container'),
		appointmentForm: $('.form-appointment'),
		cooperateForm: $('.form-cooperate'),
		get forms() {
			return this.appointmentForm.find('form').add(
				this.cooperateForm.find('form')
			);
		},
		dimmer: $('.content-dimmer'),
		inputs: $('.form input:not(:hidden)'),
		phoneInputs: $('.phone-input'),
		sTitle: $('.sst-title'),
		sPrice: $('.sst-price'),
		sTime: $('.sst-time'),
		sInput: $('.selected-service')
	};

	this.heroSliderTimer = {
		id: null,
		start: function() {
			self.heroSliderTimer.id = setTimeout(function() {
				actions.changeHeroSlide(state.heroSlider.slide + 1);
			}, 4000);
		},
		stop: function() {
			clearTimeout(self.heroSliderTimer.id);
		},
		restart: function() {
			self.heroSliderTimer.stop();
			self.heroSliderTimer.start();
		}
	};

	var State = function() {
		this.cooperate = false;
		this.cooperateCounter = 0;
		this.earningsMultiplier = 24600;
		this.earnings = 0;

		this.selectedService = 0;
		this.selectServiceOpen = false;

		this.cooperateFormVisible = false;
		this.cooperateFormSent = false;
		this.appointmentFormVisible = false;
		this.appointmentFormSent = false;

		this.navMobileVisible = false;

		this.heroSlider = {
			slide: 0,
			prevOutSlide: null,
			prevInSlide: null,
			nextOutSlide: null,
			nextInSlide: null
		};

		this.slider = {
			slide: 0,
			prevOutSlide: null,
			prevInSlide: null,
			nextOutSlide: null,
			nextInSlide: null
		};

		this.isMobile = function() {
			return window.innerWidth <= 500;
		};
	};

	var actions = {
		initScroll: function() {
			$(window).scroll(function() {
				if (state.isMobile()) {
					if (window.scrollY >= window.innerHeight - 65 && state.theme !== 'dark') {
						state.theme = 'dark';
						DOM.root.addClass('dark');
					} else if (window.scrollY < window.innerHeight - 65 && state.theme !== null) {
						state.theme = null;
						DOM.root.removeClass('dark');
					}
				}
			});
		},
		initWheel: function() {
			var totalDelta = 0;
			var scrollTimeout;
			var moving = false;
			var treshold = 0;

			var scrollingTime = 1000;

			var moveIt = function() {
				// console.warn('moving for %f', totalDelta);
				moving = true;
				setTimeout(function() {
					moving = false;
				}, scrollingTime);

				var curSlide = state.slider.slide;

				if (totalDelta > 0 && curSlide < DOM.headerNav.length - 1) {
					actions.changeSlide(curSlide + 1);
				} else if (totalDelta < 0 && curSlide > 0) {
					actions.changeSlide(curSlide - 1);
				}
			};

			$(document).on('wheel', function(e) {
				var ev = e.originalEvent;

				if (
					moving ||
					state.cooperateFormVisible ||
					state.appointmentFormVisible ||
					state.isMobile() ||
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
		changeSlide: function(index) {
			if (this && this.getAttribute) {
				index = parseInt(this.getAttribute('data-index'), 10);
			}
			var curSlide = state.slider.slide;

			if (index > curSlide) {
				DOM.slides.eq(curSlide).addClass('prev-out');
				DOM.slides.eq(index).addClass('next-in');
				state.slider.prevOutSlide = curSlide;
				state.slider.nextInSlide = index;
				setTimeout(function() {
					DOM.slides.eq(state.slider.prevOutSlide).removeClass('prev-out');
					DOM.slides.eq(state.slider.nextInSlide).removeClass('next-in');
					state.slider.prevOutSlide = null;
					state.slider.nextInSlide = null;
				}, 1000);
			} else if (index < curSlide) {
				DOM.slides.eq(curSlide).addClass('prev-in');
				DOM.slides.eq(index).addClass('next-out');
				state.slider.prevInSlide = curSlide;
				state.slider.nextOutSlide = index;
				setTimeout(function() {
					DOM.slides.eq(state.slider.prevInSlide).removeClass('prev-in');
					DOM.slides.eq(state.slider.nextOutSlide).removeClass('next-out');
					state.slider.prevInSlide = null;
					state.slider.nextOutSlide = null;
				}, 1000);
			}

			state.slider.slide = index;

			DOM.slides
				.eq(curSlide).removeClass('active').end()
				.eq(index).addClass('active');
			DOM.sliderControls
				.eq(curSlide).removeClass('active').end()
				.eq(index).addClass('active');
			DOM.headerNav
				.eq(curSlide).removeClass('active').end()
				.eq(index).addClass('active');

			if (index > 0) {
				state.theme = 'dark';
				DOM.root.addClass('dark');
				self.heroSliderTimer.stop();
			} else {
				state.theme = null;
				DOM.root.removeClass('dark');
				self.heroSliderTimer.start();
			}
		},
		selectService: function(index) {
			if (this && this.getAttribute) {
				index = parseInt(this.getAttribute('data-index'), 10);
			}
			state.selectedService = index;

			var service = DOM.services.eq(index);

			DOM.sTitle.html(service.find('.ssd-title').html());
			DOM.sPrice.html(service.find('.ssd-price').html());
			DOM.sTime.html(service.attr('data-time'));
			DOM.sInput.val(service.attr('data-service'));

			DOM.services.removeClass('selected');
			service.addClass('selected');

			actions.toggleServiceSelect(false);
		},
		toggleServiceSelect: function(newState) {
			state.selectServiceOpen = typeof newState === 'undefined' ? !state.selectServiceOpen : newState;
			DOM.serviceSelect.toggleClass('open', state.selectServiceOpen);
		},
		initInputs: function() {

			var checkInput = function() {
				if ($.trim(this.value).length > 0) {
					$(this).removeClass('empty').addClass('filled');
				} else {
					$(this).removeClass('filled').addClass('empty');
				}
			};

			DOM.inputs
				.each(function() {
					checkInput.call(this);
				})
				.on('input', function() {
					checkInput.call(this);
				});

			if (window.mask) {
				DOM.phoneInputs.each(function() {
					window.mask(this, checkInput);
				});
			} else {
				console.warn('mask wasn\'t loaded!');
			}
		},
		toggleForm: function(form, newState) {
			if (this && this.getAttribute) {
				form = this.getAttribute('data-form');
				newState = this.getAttribute('data-show');
			}

			var prop = form + 'Visible';

			if (state[prop] === newState) {
				return;
			}

			state[prop] = newState === '' ? !state[prop] : !!newState;

			DOM.root.toggleClass('form-visible', state[prop]);

			if (newState) {
				var originatesFromForm = false;

				DOM[form].on('click.' + form, function(e) {
					originatesFromForm = true;
				});

				$(document).on('click.' + form, function(e) {
					if (!originatesFromForm) {
						actions.toggleForm(form, false);
					}
					originatesFromForm = false;
				});
			} else {
				DOM[form].off('.' + form);
				$(document).off('.' + form);
			}
			DOM[form].toggleClass('visible', !!newState);
		},
		toggleNavMobile: function(newState) {
			state.navMobileVisible = newState === 'undefined' ? !state.navMobileVisible : newState;
			DOM.root.toggleClass('nav-mobile-visible', state.navMobileVisible);
		},
		scrollToSection: function() {
			var index = this.getAttribute('data-index');
			var section = DOM.slides[index];

			if (section) {
				window.scrollTo(window.scrollX, section.offsetTop);
				actions.toggleNavMobile(false);
			} else {
				console.warn('section with index %i not found!', index);
			}
		},
		cooperate: function() {
			state.cooperate = true;
			state.earnings = state.cooperateCounter * state.earningsMultiplier;
			DOM.cooperate.toggleClass('cooperate', state.cooperate);
			DOM.earnings.html(state.earnings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '));
		},
		changeCooperateCounter: function(amount) {
			state.cooperateCounter += amount;
			if (state.cooperateCounter < 1) {
				state.cooperateCounter = 1;
			} else if (state.cooperateCounter > 12) {
				state.cooperateCounter = 12;
			}
			DOM.counter.html(state.cooperateCounter);
		},
		increaseCooperateCounter: function() {
			actions.changeCooperateCounter(1);
		},
		decreaseCooperateCounter: function() {
			actions.changeCooperateCounter(-1);
		},
		changeHeroSlide: function(index) {
			if (this && this.getAttribute) {
				index = parseInt(this.getAttribute('data-index'), 10);
			}
			var curSlide = state.heroSlider.slide;

			var max = DOM.heroSlides.length - 1;
			var nextSlide;

			if (index > max) {
				nextSlide = 0;
			} else if (index < 0) {
				nextSlide = max;
			} else {
				nextSlide = index;
			}

			state.heroSlider.slide = nextSlide;

			if (index > curSlide) {
				state.heroSlider.prevOutSlide = curSlide;
				state.heroSlider.nextInSlide = nextSlide;
				DOM.heroSlides.eq(curSlide).addClass('prev-out');
				DOM.heroSlides.eq(nextSlide).addClass('next-in');
				setTimeout(function() {
					DOM.heroSlides.eq(state.heroSlider.prevOutSlide).removeClass('prev-out');
					DOM.heroSlides.eq(state.heroSlider.nextInSlide).removeClass('next-in');
					state.heroSlider.prevOutSlide = null;
					state.heroSlider.nextInSlide = null;
				}, 1000);
			} else if (index < curSlide) {
				state.heroSlider.prevInSlide = curSlide;
				state.heroSlider.nextOutSlide = nextSlide;
				DOM.heroSlides.eq(curSlide).addClass('prev-in');
				DOM.heroSlides.eq(nextSlide).addClass('next-out');
				setTimeout(function() {
					DOM.heroSlides.eq(state.heroSlider.prevInSlide).removeClass('prev-in');
					DOM.heroSlides.eq(state.heroSlider.nextOutSlide).removeClass('next-out');
					state.heroSlider.prevInSlide = null;
					state.heroSlider.nextOutSlide = null;
				}, 1000);
			}

			self.heroSliderTimer.restart();

			DOM.heroSlides
				.eq(curSlide).removeClass('active').end()
				.eq(nextSlide).addClass('active');
			DOM.heroSliderControls
				.eq(curSlide).removeClass('active').end()
				.eq(nextSlide).addClass('active');
			DOM.heroSliderTexts
				.eq(curSlide).removeClass('active').end()
				.eq(nextSlide).addClass('active');
		},
		submitForm: function(form) {
			var name = form.getAttribute('name');
			var $formContainer = DOM[name];
			var $form = $(form);

			$.ajax({
				dataType: 'json',
				data: $form.serialize(),
				type: $form.prop('method') || 'post',
				url: $form.prop('action') || '/',
				success: function(data) {
					state[name + 'Sent'] = true;
					$formContainer.addClass('sent');
				},
				error: function(err) {
					console.log('failed to send the form', form);
				}
			});
		},
		validateForm: function(form) {
			var self = this;
			var container;
			var $container;

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
				$input.siblings('.input-error').attr('data-validation-message', dict.validationMessage[className]);
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
						return;
					}

					if (this.type === 'email' && !this.value.match(emailRegexp)) {
						markInvalid.call(this, 'email');
					}

					if (this.type === 'tel' && !this.value.match(new RegExp(this.getAttribute('data-regexp')))) {
						markInvalid.call(this, 'tel');
					}
				});

			return valid;
		},
	};

	var state = new State();

	actions.initWheel();
	actions.initScroll();
	actions.changeSlide(0);
	actions.changeHeroSlide(0);
	actions.changeCooperateCounter(1);
	actions.initInputs();
	actions.selectService(0);
	this.heroSliderTimer.start();

	this.state = state;
	this.actions = actions;
	this.DOM = DOM;
};


$(function() {

	$.getJSON('js/dict.json', function(dict) {
		var app = new App(dict);
		var actions = app.actions;
		var state = app.actions;

		$(document).on('click', '[data-action]', function(e) {
			e.preventDefault();
			var action = this.getAttribute('data-action');

			if (action in actions) {
				actions[action].call(this);
			} else {
				console.warn('Unknown action');
			}
		});

		app.DOM.forms
			.each(function() {
				this.noValidate = true;
			})
			.submit(function(e) {
				e.preventDefault();
				if (actions.validateForm(this)) {
					actions.submitForm(this);
				}
			});
	});

});
