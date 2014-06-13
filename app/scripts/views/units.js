'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers'
], function ($, _, Backbone, JST, Helpers) {
	var UnitsView = Backbone.View.extend({
		template: JST['app/scripts/templates/units.ejs'],
		initialize: function() {

		},
		render: function() {
			this.$el.html(this.template());
		},
		afterRender: function() {
			Helpers.setTitleInfo({
				name: 'Unit converter',
				icon: 'stethoscope',
				backgroundColor: 'turquoise'
			});
		}
	});

	return UnitsView;
});
