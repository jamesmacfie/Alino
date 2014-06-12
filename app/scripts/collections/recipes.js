/*global define*/

define([
		'underscore',
		'backbone',
		'collections/groups',
		'collections/steps',
		'modules/helpers',
		'models/recipe'
], function (_, Backbone, Groups, Steps, Helpers, Recipe) {
		'use strict';

		var RecipeCollection = Backbone.Collection.extend({
			storageKey: 'bRecipes',
			model: Recipe,
			initialize: function() {
				this.loadFromLocalStorage();
			},
			loadFromLocalStorage: function() {
				Helpers.loadFromLocalStorage(this);
				this.loadChildren();
			},
			saveToLocalStorage: function(ignoreRecipeSteps) {
				Helpers.saveToLocalStorage(this);

				if (!ignoreRecipeSteps) {
					this.saveRecipeSteps();
				}
			},
			loadChildren: function() {
				var stepArray = [],
					steps,
					mapFunction = function(stepId) {
						var colStep = Steps.get(stepId);
						return colStep;
					},
					filterFunction = function(step) {
						return step !== undefined;
					};

				this.forEach(function(recipe) {
					steps = recipe.get('steps');
					stepArray = steps.map(mapFunction).filter(filterFunction);
					recipe.set('steps', stepArray);
				}.bind(this));
			},
			saveRecipeSteps: function() {
				var steps;

				this.forEach(function(recipe) {
					steps = recipe.get('steps');
					steps.forEach(function(s) {
						var step = Steps.get(s.id);
						step = s;
					});
				}.bind(this));

				Steps.saveToLocalStorage();
			},
			clean: function() {
				//Removes models from the collection that aren't in local storage.
				var saved = Helpers.returnFromLocalStorage(this.storageKey);
				console.log(saved);
				this.forEach(function(recipe) {
					if (saved.get(recipe.id) === undefined) {
						this.remove(recipe);
					}
				});
			}
		});


		return new RecipeCollection();
		// return new RecipeCollection([
		// 	{
		// 		id: 1,
		// 		name: 'Light body, triple hop',
		// 		description: 'A single infusion mash at 64.4 C. Includes mash out and sparge. 90 minute boil with hop additions at 90 minutes, 20 minutes, and flame out.',
		// 		steps: [1, 2, 3]
		// 	},
		// 	{
		// 		id: 2,
		// 		name: 'Medium body, single hop',
		// 		description: 'A single infusion mash at 66.7 C. Includes mash out and sparge. 90 minute boil with ha single hop addition at 60 minutes.',
		// 		steps: [1, 2, 3]
		// 	},
		// 	{
		// 		id: 3,
		// 		name: 'Light body, single hop',
		// 		description: 'A single infusion mash at 64.4 C. Includes mash out and sparge. 60 minute boil with ha single hop addition at 60 minutes.',
		// 		steps: [1, 2, 3]
		// 	}
		// ]);
});
