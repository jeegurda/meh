'use strict';

var Content = React.createClass({
	mixins: [FluxMixin],
	changeSlide: function(e) {
		this.getFlux().actions.changeSlide(parseInt(e.target.getAttribute('data-index')));
	},
	changeHeroSlide: function(e) {
		this.getFlux().actions.changeHeroSlide(parseInt(e.target.getAttribute('data-index')));
	},
	cooperate: function() {
		this.getFlux().actions.cooperate();
	},
	formCooperateToggle: function(state) {
		var parent = this.props.parent;
		this.getFlux().actions.formCooperateToggle(state, parent.DOM);
	},
	formAppointmentToggle: function(state) {
		var parent = this.props.parent;
		this.getFlux().actions.formAppointmentToggle(state, parent.DOM);
	},
	cooperateCounterChange: function(amount) {
		this.getFlux().actions.cooperateCounterChange(amount);
	},
	render: function() {

		var store = this.getFlux().stores.MehStore;
		var storeState = store.getState();
		var dict = store.dict;
		var self = this;
		var parent = this.props.parent;

		var getSlideClassNames = function(index) {
			var classNames = [];
			Object.keys(storeState.slider).forEach(function(prop) {
				var obj = storeState.slider[prop];
				if (index === obj.index) {
					classNames.push(obj.className);
				}
			});
			return classNames.join(' ');
		};
		var getHeroSlideClassNames = function(index) {
			var classNames = [];
			Object.keys(storeState.heroSlider).forEach(function(prop) {
				var obj = storeState.heroSlider[prop];
				if (index === obj.index) {
					classNames.push(obj.className);
				}
			});
			return classNames.join(' ');
		};

		var contentCooperate;

		if (storeState.cooperate) {
			contentCooperate = (
				<div className="cc-block">
					<p>{dict.contentCooperateEarnings}</p>
					<div className="cc-middle">
						<div className="ccm-result">{parent.utils.format(storeState.weekEarnings)}</div>
					</div>
					<button className="button" onClick={this.formCooperateToggle.bind(null, true)}>
						<span>{dict.contentCooperateShowForm}</span>
					</button>
				</div>
			)
		} else {
			contentCooperate = (
				<div className="cc-block">
					<p>{dict.contentCooperateTime}</p>
					<div className="cc-middle">
						<div className="ccm-decrease" onClick={this.cooperateCounterChange.bind(null, -1)}></div>
						<div className="ccm-counter">{storeState.cooperateCounter}</div>
						<div className="ccm-increase" onClick={this.cooperateCounterChange.bind(null, 1)}></div>
					</div>
					<button className="button" onClick={this.cooperate}>
						<span>{dict.contentCooperateCount}</span>
					</button>
				</div>
			)
		}

		return (
			<section className="content">
				<div className="content-slides">
					<div className={'content-slide content-index ' + getSlideClassNames(0)}>
						<div className="content-hero-slider">
							<div className="chs-slides">
								{dict.heroSlides.map(function(e, i) {
									return (
										<div className={'chs-slide ' + getHeroSlideClassNames(i)} key={i}>
											<img src={'./static/images/' + e.image} alt=""/>
										</div>
									)
								})}
							</div>
							<div className="container-relative">
								<div className="chs-texts">
									{dict.heroSlides.map(function(e, i) {
										return (
											<div className={'chs-text ' + (i === storeState.heroSlider.slide.index ? storeState.heroSlider.slide.className : '')} key={i}>
												<article>
													<p>{e.text}</p>
													<span>{e.annotation}</span>
												</article>
											</div>
										)
									})}
								</div>
								<div className="chs-controls">
									<ul>
										{dict.heroSlides.map(function(e, i) {
											return (
												<li
													className={i === storeState.heroSlider.slide.index ? storeState.heroSlider.slide.className : ''}
													data-index={i}
													onClick={self.changeHeroSlide}
													key={i}
												/>
											)
										})}
									</ul>
								</div>
							</div>
						</div>
						<div className="container-relative">
							<div className="content-social">
								{dict.links.map(function(e, i) {
									return (
										<a className={e.className} target="_blank" href={e.url} key={i}></a>
									)
								})}
							</div>
						</div>
						<div className="content-appointment" onClick={this.formAppointmentToggle.bind(this, true)}>
							<div className="container">
								{dict.contentAppointment}
							</div>
						</div>
					</div>
					<div className={'content-slide content-idea ' + getSlideClassNames(1)}>
						<div className="container padded">
							<div className="ci-container">
								{dict.contentIdea.map(function(e, i) {
									return (
										<div className="ci-item content-block" key={i}>
											<figure>
												<img src={'./static/images/' + e.image} alt=""/>
											</figure>
											<h3>{e.title}</h3>
											<p>{e.text}</p>
										</div>
									)
								})}
							</div>
						</div>
					</div>
					<div className={'content-slide content-features ' + getSlideClassNames(2)}>
						<div className="container padded">
							<div className="cf-container">
								{dict.contentFeatures.map(function(e, i) {
									return (
										<div className="cf-item content-block" key={i}>
											<h3>{e.title}</h3>
											<p>{e.text}</p>
										</div>
									)
								})}
							</div>
						</div>
					</div>
					<div className={'content-slide content-prices ' + getSlideClassNames(3)}>
						<div className="container padded">
							<div className="cp-container">
								{dict.contentPrices.map(function(e, i) {
									return (
										<div className="cp-item content-block" key={i}>
											<div className="cp-price">{e.price}</div>
											<h3>{e.title}</h3>
											<p>{e.text}</p>
										</div>
									)
								})}
							</div>
						</div>
					</div>
					<div className={'content-slide content-cooperate ' + getSlideClassNames(4)}>
						<div className="container padded">
							<div className="cc-container content-block">
								<h4>{dict.contentCooperateTitle}</h4>
								{contentCooperate}
							</div>
						</div>
					</div>
				</div>
				<div className="container-relative">
					<div className="content-controls">
						<ul>
							{[1,2,3,4,5].map(function(e, i) {
								return (
									<li
										data-index={i}
										onClick={self.changeSlide}
										className={i === storeState.slider.slide.index ? storeState.slider.slide.className : ''}
										key={i}
									/>
								)
							})}
						</ul>
					</div>
				</div>
			</section>
		)
	}
});

module.exports = Content;