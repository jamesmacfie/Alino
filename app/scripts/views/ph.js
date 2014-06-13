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
		initialize: function() {

		},
		render: function() {
			this.$el.html(this.template());
		},
		afterRender: function() {
			Helpers.setTitleInfo({
				name: 'Ph Adjust',
				icon: 'stethoscope',
				backgroundColor: 'turquoise'
			});
		}
	});

	return PhView;
});
