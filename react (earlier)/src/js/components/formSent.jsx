'use strict';

var FormSent = React.createClass({
	mixins: [FluxMixin],
	render: function() {

		var flux = this.getFlux();
		var dict = flux.stores.MehStore.dict;

		return (
			<section className="form-sent">
				<div className="fs-container">
					<span className="fs-icon"></span>
					<h4>{dict.formSentTitle}</h4>
					<p>{dict.formSentText}</p>
				</div>
			</section>
		)
	}
});

module.exports = FormSent;