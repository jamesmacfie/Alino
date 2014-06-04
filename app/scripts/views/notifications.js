'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers'
], function ($, _, Backbone, JST, Helpers) {
	var NotificationsView = Backbone.View.extend({
		template: JST['app/scripts/templates/notifications.ejs'],
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
				name: 'Notification Log',
				icon: 'bell',
				backgroundColor: 'yellow'
			});
		}
	});

	return NotificationsView;
});
