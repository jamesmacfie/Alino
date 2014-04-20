/*global define*/

define([
		'underscore',
		'backbone',
], function (_, Backbone) {
		'use strict';

		var GroupModel = Backbone.Model.extend({
			defaults: {
				name: '',
				order: 0
			}
		});

		return GroupModel;
});
