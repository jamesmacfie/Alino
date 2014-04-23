/*global define*/

define([
		'underscore',
		'backbone',
		'models/recipe',
		'models/group',
		'modules/helpers'
], function (_, Backbone, Recipe, Group) {
		'use strict';

		var GroupCollection = Backbone.Collection.extend({
			model: Group,
			initialize: function() {

			}
		});

		return new GroupCollection([
			{
				id: 1,
				name: 'Mash',
				order: 1,
				steps: [1, 2, 3]
			},
			{
				id: 2,
				name: 'Boil',
				order: 2,
				steps: [5, 6, 7, 8]
			}
		]);
});
