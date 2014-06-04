/*global define*/
define([
		'underscore',
		'backbone',
		'modules/helpers',
		'models/recipe',
		'models/step',
		'collections/groups'
], function (_, Backbone, Helpers, Recipe, Step, Groups) {
		'use strict';

		var StepCollection = Backbone.Collection.extend({
			storageKey: 'bSteps',
			model: Step,
			initialize: function() {
				this.loadFromLocalStorage();
			},
			loadFromLocalStorage: function() {
				Helpers.loadFromLocalStorage(this);
			},
			saveToLocalStorage: function() {
				Helpers.saveToLocalStorage(this);
			},
			returnGroupSteps: function(id) {
				var group = Groups.get(id),
					stepIds = group.get('steps'),
					steps = _.map(stepIds, function(id) {
						return this.get(id);
					});

				return steps;
			}
		});

		return new StepCollection();
		// 	{
		// 		id: 1,
		// 		name: 'Sachirification Rest',
		// 		description: 'Ultricies Venenatis Parturient Commodo Vulputate',
		// 		groupId: 1,
		// 		targetTemp: 64.4,
		// 		time: 60,
		// 		notification: false,
		// 		sms: true
		// 	},
		// 	{
		// 		id: 2,
		// 		name: 'Mash out',
		// 		description: 'Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper.',
		// 		groupId: 1,
		// 		targetTemp: 75.6,
		// 		time: 10,
		// 		notification: true,
		// 		sms: true
		// 	},
		// 	{
		// 		id: 3,
		// 		name: 'Sparge',
		// 		description: 'Ipsum Nullam Sem',
		// 		groupId: 1,
		// 		targetTemp: 75.6,
		// 		time: 10,
		// 		notification: true,
		// 		sms: true
		// 	},
		// 	{
		// 		id: 5,
		// 		name: 'Start boil',
		// 		description: '',
		// 		groupId: 2,
		// 		time: 90,
		// 		notification: false,
		// 		sms: false
		// 	},
		// 	{
		// 		id: 6,
		// 		name: 'Add bittering hops',
		// 		description: 'Add bittering hops at 60 minutes.',
		// 		groupId: 2,
		// 		time: 60,
		// 		notification: true,
		// 		sms: true
		// 	},
		// 	{
		// 		id: 7,
		// 		name: 'Add Flavor Hops',
		// 		description: 'Add flavor hops at 10 minutes. If you are adding irish moss or yeast nutrient then add these to the boil here too. If you are using an immersion chiller, insert the chiller into the boil no later than now.',
		// 		groupId: 2,
		// 		time: 10,
		// 		notification: true,
		// 		sms: true
		// 	},
		// 	{
		// 		id: 8,
		// 		name: 'Flame Out',
		// 		description: 'Add arome hops and turn off the heat.',
		// 		groupId: 2,
		// 		time: 0,
		// 		notification: true,
		// 		sms: true
		// 	}
		// ]);
});
