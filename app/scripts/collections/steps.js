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
			},
			addInDefaults: function() {
				// This is disgusting
				var me = this,
					steps = [{ //1
						id: Helpers.randomId(),
						name: 'Sachirification Rest',
						description: 'Ultricies Venenatis Parturient Commodo Vulputate',
						groupId: 2,
						targetTemp: 64.4,
						time: 60,
						notification: false,
						sms: true
					},
					{ //2
						id: Helpers.randomId(),
						name: 'Mash out',
						description: 'Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper.',
						groupId: 2,
						targetTemp: 75.6,
						time: 10,
						notification: true,
						sms: true
					},
					{ //3
						id: Helpers.randomId(),
						name: 'Sparge',
						description: 'Ipsum Nullam Sem',
						groupId: 2,
						targetTemp: 75.6,
						time: 10,
						notification: true,
						sms: true
					},
					{ //4
						id: Helpers.randomId(),
						name: 'Start boil',
						description: '',
						groupId: 4,
						time: 90,
						notification: false,
						sms: false
					},
					{ //5
						id: Helpers.randomId(),
						name: 'Add bittering hops',
						description: 'Add bittering hops at 60 minutes.',
						groupId: 4,
						time: 60,
						notification: true,
						sms: true
					},
					{ //6
						id: Helpers.randomId(),
						name: 'Add Flavor Hops',
						description: 'Add flavor hops at 10 minutes. If you are adding irish moss or yeast nutrient then add these to the boil here too. If you are using an immersion chiller, insert the chiller into the boil no later than now.',
						groupId: 4,
						time: 10,
						notification: true,
						sms: true
					},
					{ //7
						id: Helpers.randomId(),
						name: 'Aroma Hops & Flame Out',
						description: 'Add aroma hops and turn off the heat.',
						groupId: 4,
						time: 0,
						notification: true,
						sms: true
					},
					{ //8
						id: Helpers.randomId(),
						name: 'Some Rest',
						description: 'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus.',
						groupId: 2,
						targetTemp: 66.7,
						time: 60,
						notification: false,
						sms: true
					},
					{ //9
						id: Helpers.randomId(),
						name: 'Mash out',
						description: 'Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper.',
						groupId: 2,
						targetTemp: 75.6,
						time: 10,
						notification: true,
						sms: true
					},
					{ //10
						id: Helpers.randomId(),
						name: 'Sparge',
						description: 'Ipsum Nullam Sem',
						groupId: 2,
						targetTemp: 75.6,
						time: 10,
						notification: true,
						sms: true
					},
					{ //11
						id: Helpers.randomId(),
						name: 'Start boil',
						description: '',
						groupId: 4,
						time: 90,
						notification: false,
						sms: false
					},
					{ //12
						id: Helpers.randomId(),
						name: 'Add bittering hops',
						description: 'Add bittering hops at 60 minutes.',
						groupId: 4,
						time: 60,
						notification: true,
						sms: true
					},
					{ //13
						id: Helpers.randomId(),
						name: 'Flame Out',
						description: 'Turn off the heat.',
						groupId: 4,
						time: 0,
						notification: true,
						sms: true
					},
					{ //14
						id: Helpers.randomId(),
						name: 'Sachirification Rest',
						description: 'Ultricies Venenatis Parturient Commodo Vulputate',
						groupId: 2,
						targetTemp: 64.4,
						time: 60,
						notification: false,
						sms: true
					},
					{ //15
						id: Helpers.randomId(),
						name: 'Mash out',
						description: 'Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper.',
						groupId: 2,
						targetTemp: 75.6,
						time: 10,
						notification: true,
						sms: true
					},
					{ //16
						id: Helpers.randomId(),
						name: 'Sparge',
						description: 'Ipsum Nullam Sem',
						groupId: 2,
						targetTemp: 75.6,
						time: 10,
						notification: true,
						sms: true
					},
					{ //17
						id: Helpers.randomId(),
						name: 'Start boil',
						description: '',
						groupId: 4,
						time: 90,
						notification: false,
						sms: false
					},
					{ //18
						id: Helpers.randomId(),
						name: 'Add bittering hops',
						description: 'Add bittering hops at 60 minutes.',
						groupId: 4,
						time: 60,
						notification: true,
						sms: true
					},
					{ //19
						id: Helpers.randomId(),
						name: 'Flame Out',
						description: 'Turn off the heat.',
						groupId: 4,
						time: 0,
						notification: true,
						sms: true
					}];

				steps.forEach(function(item) {
					me.add(item);
				});

				return [
					//Light body, triple hop
					[
						steps[0].id,
						steps[1].id,
						steps[2].id,
						steps[3].id,
						steps[4].id,
						steps[5].id,
						steps[6].id
					],
					//Medium body, single hop
					[
						steps[7].id,
						steps[8].id,
						steps[9].id,
						steps[10].id,
						steps[11].id,
						steps[12].id
					],
					//Light body, single hop
					[
						steps[13].id,
						steps[14].id,
						steps[15].id,
						steps[16].id,
						steps[17].id,
						steps[18].id
					]
				];
			}
		});

		return new StepCollection();
});
