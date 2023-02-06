'use strict';

var Cooperate = React.createClass({
	mixins: [FluxMixin],
	formCooperateToggle: function(state) {
		var parent = this.props.parent;
		this.getFlux().actions.formCooperateToggle(state, parent.DOM);
	},
	componentDidMount: function() {
		var parent = this.props.parent;

		this.getFlux().actions.initInputs('formCooperateElement', 'formCooperatePhoneInput', parent.DOM);
		parent.DOM.formCooperate.noValidate = true;
	},
	handleSubmit: function(e) {
		var parent = this.props.parent;

		if (this.getFlux().stores.MehStore.validateForm('formCooperate', parent.DOM)) {
			this.getFlux().actions.submitForm('formCooperate', parent.DOM);
		}
		e.preventDefault();
	},
	render: function() {

		var store = this.getFlux().stores.MehStore;
		var storeState = store.getState();
		var parent = this.props.parent;
		var dict = store.dict;

		var FormSent = require('./formSent.jsx');

		return (
			<section ref={function(el) {parent.DOM.formCooperateElement = el}} className={'form form-cooperate ' + (storeState.formCooperateVisible ? 'visible' : '')}>
				{storeState.formCooperateSent ?
				<FormSent/>
				:
				<section className="form-container">
					<header>
						<h4>{dict.formCooperateTitle}</h4>
						<h5>{dict.formCooperateSelect}</h5>
					</header>
					<form ref={function(el) {parent.DOM.formCooperate = el}} method="POST" action="https://formspree.io/komolkin@gmail.com" onSubmit={this.handleSubmit}>
						<div className="form-padded">
							{Object.keys(dict.formCooperateFields).map(function(e, i) {
								var field = dict.formCooperateFields[e];
								return (
									<div className="input" key={i}>
										<input
											type={field.type}
											required={field.required}
											ref={field.type === 'tel' ? function(el) {parent.DOM.formCooperatePhoneInput = el} : null}
											data-regexp={field.regexp || null}
											name={e}
										/>
										<span className="placeholder">{field.displayName}</span>
										<p className="input-error">{field.displayName}</p>
									</div>
								)
							})}
							<button className="button light">
								<span>{dict.formSubmitCooperate}</span>
							</button>
						</div>
					</form>
				</section>
				}
				<footer onClick={this.formCooperateToggle.bind(null, false)} className="form-hide"></footer>
			</section>
		)
	}
});

module.exports = Cooperate;