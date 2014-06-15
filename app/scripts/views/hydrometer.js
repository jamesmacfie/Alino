'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers'
], function ($, _, Backbone, JST, Helpers) {
	var HydrometerView = Backbone.View.extend({
		template: JST['app/scripts/templates/hydrometer.ejs'],
		events: {
			'input .js-change': 'onTextChangeHandler'
		},
		sg: '1.050',
		temp: 20,
		initialize: function() {

		},
		render: function() {
			this.$el.html(this.template({
				sg: this.sg,
				temp: this.temp
			}));
		},
		afterRender: function() {
			Helpers.setTitleInfo({
				name: 'Hydrometer adjust',
				icon: 'stethoscope',
				backgroundColor: 'turquoise'
			});

			this.calculateAdjustedGravity(this.sg, this.temp);
		},
		onTextChangeHandler: function() {
			var $gravity = $('[data-property="sg"]'),
				$temp = $('[data-property="temp"]'),
				gravity = $gravity.val().trim(),
				temp = $temp.val().trim();

			if (!gravity.length || !temp.length) {
				this.removeBadassText();
				return;
			}

			this.calculateAdjustedGravity(gravity, temp);
		},
		removeBadassText: function() {
			$('.js-adjusted-gravity').text('');
		},
		showBadassText: function(text) {
			$('.js-adjusted-gravity').text(text);
		},
		calculateAdjustedGravity: function(gravity, temp) {
			var calibrationTemp = 20, //Probably need this in settings somewhere
				//The formula here works with Fahrenheit. Change the celcius we get in to fahrenheit.
				calibrationTempF = Helpers.celciusToFahrenheit(calibrationTemp),
				tempF = Helpers.celciusToFahrenheit(temp),
				adjustment;

			//TODO: put in some validation here
				adjustment = gravity * ((1.00130346 - 0.000134722124 * tempF + 0.00000204052596 * Math.pow(tempF, 2) - 0.00000000232820948 * Math.pow(tempF, 3)) / (1.00130346 - 0.000134722124 * calibrationTempF + 0.00000204052596 * Math.pow(calibrationTempF, 2) - 0.00000000232820948 * Math.pow(calibrationTempF, 3)));

			if (Number.isNaN(adjustment)) {
				this.showBadassText('--');
			} else {
				this.showBadassText(adjustment.toFixed(3));
			}
		}
	});

	return HydrometerView;
});
