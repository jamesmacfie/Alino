/*global define*/

define([
		'underscore',
		'backbone',
		'modules/popup',
		'modules/notificationSounds',
		'models/settings'
], function (_, Backbone, Popup, Notifications, Settings) {
		'use strict';

		var TimerModel = Backbone.Model.extend({

			defaults: {
				active: true,
				notification: true,
				sms: false,
				label: '',
				startValue: 0
			},

			notify: function() {
				if (this.get('notification')) {
					Notifications.play(Settings.get('notification'));
				}
				if (this.get('sms') && Settings.get('sms').length) {
					window.sms.send(
						Settings.get('sms'),
						'Brewduino timer: ' + this.get('startValue') + ':00 - ' + this.get('label'),
						'',
					function() {},
					function() {
						var f = function() {
							this.destroy();
						};

						var areYouSurePopup = new Popup('Your SMS wan\'t sent!',
							'Brewduino timer: ' + this.get('startValue') + ':00 - ' + this.get('label'),
							f,
							f);
						areYouSurePopup.show();
					});
				}
			}
		});

		return TimerModel;
});
