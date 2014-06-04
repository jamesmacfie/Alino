'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers'
], function ($, _, Backbone, JST, Helpers) {
	var ToolsView = Backbone.View.extend({
		template: JST['app/scripts/templates/tools.ejs'],
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
				name: 'Tools & Calculators',
				icon: 'stethoscope',
				backgroundColor: 'turquoise'
			});
		}
	});

	return ToolsView;
});
