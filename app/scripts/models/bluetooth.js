'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'models/settings'
	], function ($, _, Backbone, Settings) {

	var BluetoothModel = Backbone.Model.extend({
		defaults: {
			devices: [],
			enabled: false,
			tempReadings: []
		},
		initialize: function() {
			//TODO REMOVE
			if (window.bluetoothSerial) {
				this.bluetoothSerial = window.bluetoothSerial;
			} else {
				this.bluetoothSerial = {
					isEnabled: function(s) {
						s.call(this);
					},
					list: function(s) {
						s.call(this, [
							{
								address: 123,
								displayName: 'test'
							}
						]);
					}
				};
			}

			this.setEnabled();
			this.setDevices();
			this.connect(Settings.get('device'));
		},
		setEnabled: function() {
			var me = this;
			this.bluetoothSerial.isEnabled(function() {
					me.set('enabled', true);
				},function() {
					me.set('enabled', false);
				});
		},
		setDevices: function() {
				var me = this;
				this.bluetoothSerial.list(function(devices) {
					var deviceArray = [];
					devices.forEach(function(device) {
						deviceArray.push({
							address: device.address,
							displayName: device.name
						});
	        });
					me.set('devices', deviceArray);
				});
			},
		isConnected: function() {
			return this.get('enabled');
		},
		getLastTemp: function() {
			var temps = this.get('tempReadings'),
				length = temps.length;

			return temps[length - 1];
		},
		connect: function(address) {
			if (!address) {
				return;
			}
			this.startListening(address);
		},
		startListening: function(address) {
			var me = this;

			var onMessageFn = this.onMessage.bind(this),
				onLostConnectionFn = this.onLostConnection.bind(this),
				connectFn = this.connectToBluetooth.bind(this);

			var	subscribeFn = function() {
				this.bluetoothSerial.subscribe('\n', onMessageFn, onLostConnectionFn);
			}.bind(this);

			var retryFn = function() {
				setTimeout(function() {
					connectFn(address, subscribeFn, retryFn);
				}, 1000); //Retry connection in 1 second
			}.bind(this);

			this.connectToBluetooth(address, subscribeFn, retryFn);
		},
		connectToBluetooth: function(address, success, failure) {
			this.bluetoothSerial.connect(address, success, failure);
		},
		onMessage: function(message) {
			var readings = this.get('tempReadings');
			readings.push(parseFloat(message, 2));

			this.set('tempReadings', readings);
		},
		onLostConnection: function() {
			console.log('Lost connection');
		}


	});

	return new BluetoothModel();
});
