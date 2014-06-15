'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers'
], function ($, _, Backbone, JST, Helpers) {
	var PhView = Backbone.View.extend({
		template: JST['app/scripts/templates/ph.ejs'],
		events: {
			'input .js-change': 'onTextChangeHandler'
		},
		pH: 7.0,
		temp: 20,
		initialize: function() {

		},
		render: function() {
			this.$el.html(this.template({
				pH: this.pH,
				temp: this.temp
			}));
		},
		afterRender: function() {
			Helpers.setTitleInfo({
				name: 'Ph Adjust',
				icon: 'stethoscope',
				backgroundColor: 'turquoise'
			});

			this.calculateAdjustedpH(this.pH, this.temp);
		},
		onTextChangeHandler: function() {
			var $pH = $('[data-property="pH"]'),
				$temp = $('[data-property="temp"]'),
				pH = $pH.val().trim(),
				temp = $temp.val().trim();

			if (!pH.length || !temp.length) {
				this.removeBadassText();
				return;
			}

			this.calculateAdjustedpH(pH, temp);
		},
		removeBadassText: function() {
			$('.js-adjusted-ph').text('');
		},
		showBadassText: function(text) {
			$('.js-adjusted-ph').text(text);
		},
		calculateAdjustedpH: function(pH, temp) {
			//The formula here works with Fahrenheit. Change the celcius we get in to fahrenheit.
			var tempF = Helpers.celciusToFahrenheit(temp),
				adjustment;

			pH = parseFloat(pH);

			adjustment = pH + (0.0167 * (tempF - 77));

			if (Number.isNaN(adjustment)) {
				this.showBadassText('--');
			} else {
				this.showBadassText(adjustment.toFixed(2));
			}
		}
	});

	return PhView;
});
