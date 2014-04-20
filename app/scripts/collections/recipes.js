/*global define*/

define([
		'underscore',
		'backbone',
		'models/recipe',
		'models/group',
		'modules/helpers'
], function (_, Backbone, Recipe, Group, Helpers) {
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

		var tempMashGroup = new Group({
			name: 'Mash',
			'order': 1
		});

		var tempBoilGroup = new Group({
			name: 'Boil',
			'order': 2
		});

		return new RecipeCollection([
			{
				id: 1,
				name: 'Light body, triple hop',
				description: 'A single infusion mash at 64.4 C. Includes mash out and sparge. 90 minute boil with hop additions at 90 minutes, 20 minutes, and flame out.',
				steps: [
					{
						name: 'Sachirification Rest',
						description: 'Ultricies Venenatis Parturient Commodo Vulputate',
						group: tempMashGroup,
						targetTemp: 64.4,
						time: 60
					},
					{
						name: 'Mash out',
						description: 'Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper.',
						group: tempMashGroup,
						targetTemp: 75.6,
						time: 10
					},
					{
						name: 'Sparge',
						description: 'Ipsum Nullam Sem',
						group: tempMashGroup,
						targetTemp: 75.6,
						time: 10
					},
					{
						name: 'Start boil',
						description: '',
						group: tempBoilGroup,
						time: 90
					},
					{
						name: 'Add bittering hops',
						description: 'Add bittering hops at 60 minutes.',
						group: tempBoilGroup,
						time: 60
					},
					{
						name: 'Add Flavor Hops',
						description: 'Add flavor hops at 10 minutes. If you are adding irish moss or yeast nutrient then add these to the boil here too. If you are using an immersion chiller, insert the chiller into the boil no later than now.',
						group: tempBoilGroup,
						time: 10
					},
					{
						name: 'Flame Out',
						description: 'Add arome hops and turn off the heat.',
						group: tempBoilGroup,
						time: 0
					}
				]
			},
			{
				id: 2,
				name: 'Medium body, single hop',
				description: 'A single infusion mash at 66.7 C. Includes mash out and sparge. 90 minute boil with ha single hop addition at 60 minutes.',
				steps: []
			},
			{
				id: 3,
				name: 'Light body, single hop',
				description: 'A single infusion mash at 64.4 C. Includes mash out and sparge. 60 minute boil with ha single hop addition at 60 minutes.',
				steps: []
			},
		]);
});
