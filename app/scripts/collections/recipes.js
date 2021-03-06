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
				var saved = Helpers.returnFromLocalStorage(this.storageKey),
					savedRecipe;

				var checkRemove = function(recipe) {
					savedRecipe = _.find(saved, function(savedRecipe) {
						return savedRecipe.id === recipe.id;
					});

					if (savedRecipe === undefined) {
						this.remove(recipe);
					}
				};
				this.forEach(checkRemove, this);
			},
			resetToDefault: function() {
				// This is just the worst
				var newSteps = Steps.addInDefaults(),
					newRecipes = [{
						id: Helpers.randomId(),
						name: 'Light body, triple hop',
						description: 'A single infusion mash at 64.4 C. Includes mash out and sparge. 90 minute boil with hop additions at 90 minutes, 20 minutes, and flame out.',
						steps: [
							Steps.get(newSteps[0][0]),
							Steps.get(newSteps[0][1]),
							Steps.get(newSteps[0][2]),
							Steps.get(newSteps[0][3]),
							Steps.get(newSteps[0][4]),
							Steps.get(newSteps[0][5]),
							Steps.get(newSteps[0][6])
						]
					},
					{
						id: Helpers.randomId(),
						name: 'Medium body, single hop',
						description: 'A single infusion mash at 66.7 C. Includes mash out and sparge. 90 minute boil with ha single hop addition at 60 minutes.',
						steps: [
							Steps.get(newSteps[1][0]),
							Steps.get(newSteps[1][1]),
							Steps.get(newSteps[1][2]),
							Steps.get(newSteps[1][3]),
							Steps.get(newSteps[1][4]),
							Steps.get(newSteps[1][5])
						]
					},
					{
						id: Helpers.randomId(),
						name: 'Light body, single hop',
						description: 'A single infusion mash at 64.4 C. Includes mash out and sparge. 60 minute boil with ha single hop addition at 60 minutes.',
						steps: [
							Steps.get(newSteps[2][0]),
							Steps.get(newSteps[2][1]),
							Steps.get(newSteps[2][2]),
							Steps.get(newSteps[2][3]),
							Steps.get(newSteps[2][4]),
							Steps.get(newSteps[2][5])
						]
					}];

				this.add(newRecipes);
				this.saveToLocalStorage();
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
