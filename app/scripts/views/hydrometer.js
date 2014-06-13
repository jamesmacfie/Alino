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
		initialize: function() {

		},
		render: function() {
			this.$el.html(this.template());
		},
		afterRender: function() {
			Helpers.setTitleInfo({
				name: 'Hydrometer adjust',
				icon: 'stethoscope',
				backgroundColor: 'turquoise'
			});
		}
	});

	return HydrometerView;
});
