'use strict';

var Header = React.createClass({
	mixins: [FluxMixin],
	changeSlide: function(e) {
		this.getFlux().actions.changeSlide(parseInt(e.currentTarget.getAttribute('data-index')) + 1);
	},
	toggleAppointmentForm: function(state) {
		var parent = this.props.parent;
		this.getFlux().actions.formAppointmentToggle(state, parent.DOM);
	},
	toggleNavMobile: function() {
		var state = this.getFlux().stores.MehStore.getState().navMobileVisible;
		this.getFlux().actions.navMobileToggle(!state);
	},
	render: function() {

		var self = this;
		var flux = this.getFlux();
		var dict = flux.stores.MehStore.dict;
		var store = flux.stores.MehStore;
		var storeState = store.getState();

		return (
			<header className="header">
				<div className="container-relative padded">
					<a href="" className="h-logo">
						<img className="hl-light" src="./static/images/logo-b.svg" alt=""/>
						<img className="hl-dark" src="./static/images/logo-w.svg" alt=""/>
					</a>
					<div className="h-appointment">
						<button className="button" onClick={this.toggleAppointmentForm.bind(null, true)}>
							<span>{dict.headerAppointment}</span>
						</button>
					</div>
					<nav className="h-nav">
						<ul>
							{dict.headerNav.map(function(e, i) {
								return (
									<li
										data-index={i}
										key={i}
										className={(i === storeState.slider.slide.index - 1) ? storeState.slider.slide.className : ''}
										onClick={self.changeSlide}>
										<span>{e}</span>
									</li>
								)
							})}
						</ul>
					</nav>
				</div>
				<div className="nm-toggle" onClick={this.toggleNavMobile}>
					<span className="nmt-show"></span>
					<span className="nmt-hide"></span>
				</div>
			</header>
		)
	}
});

module.exports = Header;