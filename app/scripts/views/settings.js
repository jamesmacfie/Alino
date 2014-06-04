'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers'
], function ($, _, Backbone, JST, Helpers) {
	var SettingsView = Backbone.View.extend({
		template: JST['app/scripts/templates/settings.ejs'],
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
				name: 'Settings',
				icon: 'settings',
				backgroundColor: 'green'
			});
		}
	});

	return SettingsView;
});
