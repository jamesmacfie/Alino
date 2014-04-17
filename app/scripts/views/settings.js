'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/notificationsounds',
	'models/bluetooth'
], function ($, _, Backbone, JST, NotificationSounds, Bluetooth) {
	var SettingsView = Backbone.View.extend({
		el: '#settingsContainer',
		events: {
			'change select': 'onChangeHandler',
			'change input': 'onChangeHandler'
		},
		template: JST['app/scripts/templates/settings.ejs'],
		initialize: function() {

		},
		render: function() {
			this.renderPage();
		},
		renderPage: function() {
			this.$el.html(this.template({
				sounds: NotificationSounds.sounds,
				notification: this.model.get('notification'),
				sms: this.model.get('sms'),
				device: this.model.get('device'),
				devices: Bluetooth.get('devices')
			}));
		},
		onChangeHandler: function(event){
			var $target = $(event.currentTarget),
				value = $target.val(),
				property = $target.data('property'),
				saveObj = {};

			saveObj[property] = value;

			this.model.set(saveObj);
			this.model.saveToLocalStorage();

			if (property === 'device') {
				this.setDevice(value);
			}
		},
		setDevice: function(address) {
			Bluetooth.connect(address);
		}

	});

	return SettingsView;
});
