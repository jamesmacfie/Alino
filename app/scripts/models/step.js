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
			}
		});

		return StepModel;
});
