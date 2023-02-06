'use strict';

var NavMobile = React.createClass({
	mixins: [FluxMixin],
	scrollToSection: function(e) {
		this.getFlux().actions.scrollToSection(parseInt(e.currentTarget.getAttribute('data-index')) + 1);
	},
	render: function() {

		var flux = this.getFlux();
		var dict = flux.stores.MehStore.dict;
		var self = this;

		var storeState = flux.stores.MehStore.getState();

		return (
			<section className={'nav-mobile' + (storeState.navMobileVisible ? ' visible' : '')}>
				<ul className="nm-list">
					{dict.headerNav.map(function(e, i) {
						return (
							<li data-index={i} key={i} onClick={self.scrollToSection}>
								<span>{e}</span>
							</li>
						)
					})}
				</ul>
				<div className="content-social">
					{dict.links.map(function(e, i) {
						return (
							<a className={e.className} href={e.url} target="_blank" key={i}></a>
						)
					})}
				</div>
			</section>
		)
	}
});

module.exports = NavMobile;