'use strict';

var MehApp = React.createClass({
	mixins: [FluxMixin, Fluxxor.StoreWatchMixin('MehStore')],
	getDefaultProps: function() {
		return {
		};
	},
	DOM: {},
	getStateFromFlux: function() {
		var fluxState = this.getFlux().stores.MehStore.getState();

		return fluxState;
	},
	componentWillMount: function() {
		var self = this;
		this.utils = this.utils();
	},
	getInitialState: function() {
		var props = this.props;

		return {
		};
	},
	render: function() {
		var Header = require('./header.jsx');
		var Content = require('./content.jsx');
		var Cooperate = require('./cooperate.jsx');
		var Appointment = require('./appointment.jsx');
		var NavMobile = require('./navMobile.jsx');

		return (
			<div className={'meh' +
				(this.state.theme ? (' ' + this.state.theme) : '') +
				((this.state.formCooperateVisible || this.state.formAppointmentVisible) ? ' form-visible' : '') +
				(this.state.navMobileVisible ? ' nav-mobile-visible' : '')}>
				<Header parent={this}/>
				<Content parent={this}/>
				<div className="content-dimmer"></div>
				<NavMobile/>
				<Cooperate parent={this}/>
				<Appointment parent={this}/>
			</div>
		)
	},
	utils: function() {
		var self = this;

		return {
			format: function(number) {
				return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1 ');
			},
			log: function() {
				var args = Array.prototype.slice.call(arguments);
				var firstArg = args[0];
				if (firstArg === 'warn' || firstArg === 'error' || firstArg === 'debug') {
					args.shift();
				} else {
					firstArg = 'log';
				}

				if (typeof args[0] === 'string') {
					// for string interpolation to work
					args[0] = 'Meh: ' + args[0];
				} else {
					args = ['Meh:'].concat(args);
				}
				console[firstArg].apply(console, args);
			}
		}
	}
});

module.exports = MehApp;