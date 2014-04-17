/*global define*/

define([
		'underscore',
		'backbone',
], function (_, Backbone) {
		'use strict';

		var SettingsModel = Backbone.Model.extend({

			defaults: {
				notification: 1,
				sms: '',
				device: null
			},

			initialize: function(){
				this.loadFromLocalStorage();
			},
			loadFromLocalStorage: function() {
				var local = localStorage.getItem('bSettings');
				if (local === 'undefined') {
					return;
				}

				var data = JSON.parse(local);
				if (data) {
					_.each(data, function(value, key) {
						var setObj = {};
						setObj[key] = value;

						this.set(setObj, {
							silent: true
						});
					}.bind(this));
				}
			},
			saveToLocalStorage: function() {
				localStorage.setItem('bSettings', JSON.stringify(this.attributes));
			}
		});

		return new SettingsModel();
});
