/*global define*/

define([
		'underscore',
		'backbone',
		'collections/groups',
		'modules/helpers',
		'models/recipe'
], function (_, Backbone, Groups, Helpers, Recipe) {
		'use strict';

		var RecipeCollection = Backbone.Collection.extend({
			storageKey: 'bRecipes',
			model: Recipe,
			initialize: function() {
				//TODO
				//this.loadFromLocalStorage();
			},
			loadFromLocalStorage: function() {
				Helpers.loadFromLocalStorage(this);
			},
			saveToLocalStorage: function() {
				Helpers.saveToLocalStorage(this);
			}
		});

		return new RecipeCollection([
			{
				id: 1,
				name: 'Light body, triple hop',
				description: 'A single infusion mash at 64.4 C. Includes mash out and sparge. 90 minute boil with hop additions at 90 minutes, 20 minutes, and flame out.',
				steps: [1, 2, 3]
			},
			{
				id: 2,
				name: 'Medium body, single hop',
				description: 'A single infusion mash at 66.7 C. Includes mash out and sparge. 90 minute boil with ha single hop addition at 60 minutes.',
				steps: [1, 2, 3]
			},
			{
				id: 3,
				name: 'Light body, single hop',
				description: 'A single infusion mash at 64.4 C. Includes mash out and sparge. 60 minute boil with ha single hop addition at 60 minutes.',
				steps: [1, 2, 3]
			}
		]);
});
