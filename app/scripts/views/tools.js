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
			'click .js-goto-page': 'onGotoPageHandler'
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
		},
		onGotoPageHandler: function(event) {

			var $el = $(event.currentTarget),
				href =$el.data('href');

			Backbone.history.navigate(href, {trigger: true});
		}
	});

	return ToolsView;
});
