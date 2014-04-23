

/*global define*/

define([
		'underscore',
		'backbone',
		'models/recipe',
		'collections/groups',
], function (_, Backbone, Recipe) {
		'use strict';

		var RecipeCollection = Backbone.Collection.extend({
			//model: Recipe,
			initialize: function() {

				//this.loadFromLocalStorage();
			},
			loadFromLocalStorage: function() {
				var local = localStorage.getItem('bRecipes');
				if (local === 'undefined') {
					return;
				}

				var data = JSON.parse(local);
				if (data) {
					_.each(data, function(value) {
						var setObj = {};
						_.each(value, function(value, key) {
							setObj[key] = value;
						}.bind(this));

						this.add(setObj, {
							silent: true
						});

					}.bind(this));
				}
			},
			saveToLocalStorage: function() {
				var objectToSave = [];

				_.each(this.models, function(model) {
					objectToSave.push(model.attributes);
				});

				localStorage.setItem('bRecipes', JSON.stringify(objectToSave));
			}
		});

		return new RecipeCollection([
			{
				id: 1,
				name: 'Light body, triple hop',
				description: 'A single infusion mash at 64.4 C. Includes mash out and sparge. 90 minute boil with hop additions at 90 minutes, 20 minutes, and flame out.',
				groups: [1, 2]
			},
			{
				id: 2,
				name: 'Medium body, single hop',
				description: 'A single infusion mash at 66.7 C. Includes mash out and sparge. 90 minute boil with ha single hop addition at 60 minutes.',
				groups: []
			},
			{
				id: 3,
				name: 'Light body, single hop',
				description: 'A single infusion mash at 64.4 C. Includes mash out and sparge. 60 minute boil with ha single hop addition at 60 minutes.',
				groups: []
			},
		]);
});
