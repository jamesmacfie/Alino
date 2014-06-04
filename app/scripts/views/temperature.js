'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers'
], function ($, _, Backbone, JST, Helpers) {
	var TemperatureView = Backbone.View.extend({
		template: JST['app/scripts/templates/temperature.ejs'],
		events: {
		},
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function() {

		},
		render: function() {
			this.$el.html(this.template());
		},
		afterRender: function() {
			Helpers.setTitleInfo({
				name: 'Temperature',
				icon: 'temperature',
				backgroundColor: 'orange'
			});
		}
	});

	return TemperatureView;
});
