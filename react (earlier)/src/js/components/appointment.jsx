'use strict';

var Appointment = React.createClass({
	mixins: [FluxMixin],
	formAppointmentToggle: function(state) {
		var parent = this.props.parent;
		this.getFlux().actions.formAppointmentToggle(state, parent.DOM);
	},
	componentDidMount: function() {
		var parent = this.props.parent;

		this.getFlux().actions.initInputs('formAppointmentElement', 'formAppointmentPhoneInput', parent.DOM);
		parent.DOM.formAppointment.noValidate = true;
	},
	selectService: function(index) {
		this.getFlux().actions.selectService(index);
		this.getFlux().actions.serviceSelectToggle(false);
	},
	serviceSelectToggle: function(state) {
		this.getFlux().actions.serviceSelectToggle();
	},
	handleSubmit: function(e) {
		var parent = this.props.parent;

		if (this.getFlux().stores.MehStore.validateForm('formAppointment', parent.DOM)) {
			this.getFlux().actions.submitForm('formAppointment', parent.DOM);
		}
		e.preventDefault();
	},
	render: function() {

		var store = this.getFlux().stores.MehStore;
		var storeState = store.getState();
		var parent = this.props.parent;
		var dict = store.dict;
		var self = this;

		var FormSent = require('./formSent.jsx');

		var selectedServiceData = dict.services[storeState.selectedService];

		return (
			<section ref={function(el) {parent.DOM.formAppointmentElement = el}} className={'form form-appointment ' + (storeState.formAppointmentVisible ? 'visible' : '')}>
				{storeState.formAppointmentSent ?
				<FormSent/>
				:
				<section className="form-container">
					<header>
						<h4>{dict.formAppointmentTitle}</h4>
						<h5>{dict.formAppointmentSelect}</h5>
					</header>
					<form ref={function(el) {parent.DOM.formAppointment = el}} method="POST" action="https://formspree.io/komolkin@gmail.com" onSubmit={this.handleSubmit}>
						<div className={'service-select ' + (storeState.serviceSelectOpen ? 'open' : '')}>
							<div className="ss-title" onClick={this.serviceSelectToggle}>
								<div className="form-padded">
									<div className="sst-container">
										<p>{selectedServiceData.title}</p>
										<span>{selectedServiceData.price} ₽ – {selectedServiceData.time}</span>
									</div>
								</div>
							</div>
							<div className="ss-dropdown">
								{dict.services.map(function(e, i) {
									return (
										<div className={'ssd-item ' + (i === storeState.selectedService ? 'selected' : '')} key={i} onClick={self.selectService.bind(null, i)}>
											<span className="ssd-title">{e.title}</span>
											<span className="ssd-price">{e.price}</span>
										</div>
									)
								})}
							</div>
							<input
								type="hidden"
								name="service"
								value={dict.services[storeState.selectedService].title}
							/>
						</div>
						<div className="form-padded">
							{Object.keys(dict.formAppointmentFields).map(function(e, i) {
								var field = dict.formAppointmentFields[e];
								return (
									<div className="input" key={i}>
										<input
											type={field.type}
											required={field.required}
											ref={field.type === 'tel' ? function(el) {parent.DOM.formAppointmentPhoneInput = el} : null}
											data-regexp={field.regexp || null}
											name={e}
										/>
										<span className="placeholder">{field.displayName}</span>
										<p className="input-error">{field.displayName}</p>
									</div>
								)
							})}
							<button className="button light">
								<span>{dict.formSubmitAppointment}</span>
							</button>
						</div>
					</form>
				</section>
				}
				<footer onClick={this.formAppointmentToggle.bind(null, false)} className="form-hide"></footer>
			</section>
		)
	}
});

module.exports = Appointment;