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
				var recipeLen = this.length,
					stepArray = [],
					steps,
					current;

				for (var i = 0; i < recipeLen; i++) {
					current = this.at(i);
					steps = current.get('steps');
					stepArray = steps.map(function(stepId) {
							var colStep = Steps.get(stepId);
							return colStep;
						}).filter(function(step) {
							return step !== undefined;
						});
					current.set('steps', stepArray);
				}
				console.log(stepArray);
			},
			saveRecipeSteps: function() {
				//debugger;
				var recipeLen = this.length,
					steps,
					stepLen,
					step,
					current;

				for (var i = 0; i < recipeLen; i++) {
					current = this.at(i);
					steps = current.get('steps');
					stepLen = Steps.length;
					for (var j = 0; j < stepLen; j++) {
						step = Steps.get(steps[j]);
						if (step) {
							console.log(step.get('name'));
						}
					}
				}
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
