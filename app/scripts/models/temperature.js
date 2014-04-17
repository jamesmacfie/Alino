/*global define*/

define([
		'underscore',
		'backbone',
		'models/bluetooth',
		'moment',
		'modules/notificationSounds',
		'models/settings',
		'modules/popup',
], function (_, Backbone, Bluetooth, Moment, Notifications, Settings, Popup) {
		'use strict';

		var TemperatureModel = Backbone.Model.extend({
			defaults: {
				current: null,
				desired: 0,
				offsetAllowance: 1,
				notification: true,
				sms: true,
				history: [],
				curatedHistory: [],
				historyTimestamp: null,
				notificationSent: false
			},

			initialize: function(){
				this.bindEvents();
				this.loadFromLocalStorage();
			},

			bindEvents: function() {
				var latestTempFn = this.getLatestTemp.bind(this);

				setInterval(latestTempFn, 1000);
			},

			loadFromLocalStorage: function() {
				var local = localStorage.getItem('bTemperature');
				if (local === 'undefined') {
					return;
				}

				var data = JSON.parse(local);
				if (data) {
					//Only get the user set values from localStorage
					this.set('desired', data.desired);
					this.set('offsetAllowance', data.offsetAllowance);
					this.set('notification', data.notification);
				}
			},
			saveToLocalStorage: function() {
				var attributes = _.clone(this.attributes);
				delete attributes.notificationSent;

				localStorage.setItem('bTemperature', JSON.stringify(attributes));
			},
			getLatestTemp: function() {
				if (Bluetooth.isConnected()) {
					var lastTemp = Bluetooth.getLastTemp();
					if (lastTemp) {
						this.set('current', lastTemp);
						this.updateHistory(lastTemp);
						return;
					}
				}
				this.set('current', null);
			},
			status: function() {
				var current = parseFloat(this.get('current'), 2),
					desired = parseFloat(this.get('desired'), 2),
					offset = parseFloat(this.get('offsetAllowance'), 2),
					lowerThreshold = desired - offset,
					upperThreshold = desired + offset;

				if (lowerThreshold > current) {
					return 'cold';
				} else if (upperThreshold < current) {
					return 'hot';
				} else {
					return 'ok';
				}
			},
			updateHistory: function(temp) {
				var history = this.get('history'),
					curatedHistory = this.get('curatedHistory'),
					curatedLength = curatedHistory.length,
					curatedReadingNumber = 10,
					curatedShowNumber = 30;

				history.push(temp);
				this.notificationCheck();

				//TODO - Add these values to a settings page somewhere
				if (history.length % curatedReadingNumber === 0) {
					this.set('historyTimestamp', new Moment().format('h:m a'));
					curatedHistory.push(temp);
					if (curatedLength >= curatedShowNumber) {
						this.set('curatedHistory', curatedHistory.splice((curatedShowNumber * -1), curatedLength));
					}
				}
			},
			notificationCheck: function() {
				if (this.get('notificationSent')) {
					return;
				}

				var history = this.get('history'),
					currentTemp = history[history.length - 1],
					desired = this.get('desired'),
					offset = this.get('offsetAllowance'),
					lowerThreshold = parseFloat(desired, 2) - parseFloat(offset),
					upperThreshold = parseFloat(desired) + parseFloat(offset);

				if (currentTemp >= lowerThreshold && currentTemp <= upperThreshold) {
					Notifications.play(Settings.get('notification'));

					if (this.get('sms') && Settings.get('sms').length) {
					window.sms.send(
						Settings.get('sms'),
						'Brewduino temp has reached ' + currentTemp + ' degrees C. The desired temp is set to ' + desired + ' degrees C.',
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

					this.set('notificationSent', true);
				}

			}
		});

		return new TemperatureModel();
});
