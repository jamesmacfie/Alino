/*global define*/

define([
		'underscore',
		'backbone',
], function (_, Backbone) {
		'use strict';

		var StepModel = Backbone.Model.extend({
			defaults: {
				name: '',
				description: '',
				groupId: 1,
				targetTemp: null,
				time: null,
				notification: true,
				sms: true,
				order: 0
			},
			inialize: function() {

			},
			generateSummary: function() {
				var time = this.get('time'),
					targetTemp = this.get('targetTemp');
				if (!time && !targetTemp) {
					return 'No monitoring';
				} else if (time && !targetTemp) {
					return ['Countdown timer for', time, 'minutes'].join(' ');
				} else if (!time && targetTemp) {
					return ['Changes the temperature to', targetTemp].join(' ');
				} else {
					return ['Changes the temperature to', targetTemp, 'and holds it for', time, 'minutes'].join(' ');
				}
			}
		});

		return StepModel;
});
