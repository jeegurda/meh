'use strict';

var constants = require('./constants');

module.exports = {
	changeSlide: function(index) {
		this.dispatch(constants.CHANGE_SLIDE, index);
	},
	changeHeroSlide: function(index) {
		this.dispatch(constants.CHANGE_HERO_SLIDE, index);
	},
	cooperate: function() {
		this.dispatch(constants.COOPERATE);
	},
	formCooperateToggle: function(state, DOM) {
		this.dispatch(constants.FORM_COOPERATE_TOGGLE, {
			state: state,
			DOM: DOM
		});
	},
	formAppointmentToggle: function(state, DOM) {
		this.dispatch(constants.FORM_APPOINTMENT_TOGGLE, {
			state: state,
			DOM: DOM
		});
	},
	cooperateCounterChange: function(amount) {
		this.dispatch(constants.COOPERATE_COUNTER_CHANGE, amount);
	},
	selectService: function(index) {
		this.dispatch(constants.SELECT_SERVICE, index);
	},
	serviceSelectToggle: function(state) {
		this.dispatch(constants.SERVICE_SELECT_TOGGLE, state);
	},
	initInputs: function(form, phoneInput, DOM) {
		this.dispatch(constants.INIT_INPUTS, {
			form: form,
			phoneInput: phoneInput,
			DOM: DOM
		});
	},
	submitForm: function(form, DOM) {
		this.dispatch(constants.SUBMIT_FORM, {
			form: form,
			DOM: DOM
		});
	},
	navMobileToggle: function(state) {
		this.dispatch(constants.NAV_MOBILE_TOGGLE, state);
	},
	scrollToSection: function(index) {
		this.dispatch(constants.SCROLL_TO_SECTION, index);
	}
};