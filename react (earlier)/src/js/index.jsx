'use strict';

if (!Array.prototype.map) {
	throw new Error('This browser doesn\'t support ES5');
}

window.FluxMixin = Fluxxor.FluxMixin(React);

var MehStore = require('./stores/mehStore');

var stores = {
	MehStore: new MehStore()
};

var actions = require('./actions');

var flux = new Fluxxor.Flux(stores, actions);

$(function() {
	var MehApp = require('./components/mehApp.jsx');

	window.Meh_G = ReactDOM.render(
		<MehApp flux={flux}/>,
		document.getElementById('meh-root')
	);
});