'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
], function ($, _, Backbone, JST) {
	var TemperatureView = Backbone.View.extend({
		el: '#temperatureContainer',
		detailsEl: '#temperatureDetails',
		detailsTemplate: JST['app/scripts/templates/temperatureDetails.ejs'],
		settingsEl: '#temperatureSettings',
		settingsTemplate: JST['app/scripts/templates/temperatureSettings.ejs'],
		events: {
			'change input': 'onUIChange',
			'click .js-sendNotification': 'onNotificationSentChange'
		},
		notificationSent: false,
		initialize: function() {
			this.resetUI();
			this.bindEvents();
		},
		resetUI: function() {
			var details = $('<div>', {
					id: 'temperatureDetails'
				}),
				settings = $('<div>', {
					id: 'temperatureSettings'
				});

			this.$el.html('');

			details.appendTo(this.$el);
			settings.appendTo(this.$el);
		},
		bindEvents: function() {
			this.listenTo(this.model, 'change', this.onModelChange);
		},
		render: function() {
			this.resetUI();
			this.renderDetails();
			this.renderSettings();
		},
		renderDetails: function() {
			$(this.detailsEl).html(this.detailsTemplate({
				current: this.model.get('current'),
				desired: this.model.get('desired'),
				status: this.model.status()
			}));
		},
		renderSettings: function() {
			$(this.settingsEl).html(this.settingsTemplate({
				desired: this.model.get('desired'),
				offsetAllowance: this.model.get('offsetAllowance'),
				notification: this.model.get('notification'),
				sms: this.model.get('sms'),
				notificationSent: this.model.get('notificationSent')
			}));
		},
		onUIChange: function() {
			var desired = $('.temperatureDesiredInput').val(),
				offset = $('.temperatureOffsetInput').val(),
				notification = $('.temperatureNotificationInput').is(':checked'),
				sms = $('.temperatureSMSInput').is(':checked') || true;

			this.model.set({
				desired: desired,
				offsetAllowance: offset,
				notification: notification,
				sms: sms
			});

			this.model.saveToLocalStorage();
		},
		onModelChange: function(event) {
			if (Backbone.history.fragment === 'temperature') {
				this.renderDetails();

				if ('notificationSent' in event.changed) {
					this.renderSettings();
				}
			}
		},
		onNotificationSentChange: function() {
			var checked = $('.js-sendNotification').is(':checked');
			this.model.set('notificationSent', !checked);
		}
	});

	return TemperatureView;
});
