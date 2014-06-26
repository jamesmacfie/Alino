/*global define*/

define([
	'backbone',
	'modules/helpers',
	'models/group'
], function (Backbone, Helpers, Group) {
	'use strict';

	var defaultGroups = [
		{
			id: 1,
			name: 'Pre-mash',
			order: 1,
			timerDirection: 'up'
		},
		{
			id: 2,
			name: 'Mash',
			order: 2,
			timerDirection: 'up'
		},
		{
			id: 3,
			name: 'Pre boil',
			order: 3,
			timerDirection: 'up'
		},
		{
			id: 4,
			name: 'Boil',
			order: 4,
			timerDirection: 'down'
		}
	];

	var GroupCollection = Backbone.Collection.extend({
		storageKey: 'bGroups',
		model: Group,
		initialize: function() {
			this.loadFromLocalStorage();
			if (!this.models.length) {
				this.addDefaultGroups();
			}
		},
		loadFromLocalStorage: function() {
			Helpers.loadFromLocalStorage(this);
		},
		saveToLocalStorage: function() {
			Helpers.saveToLocalStorage(this);
		},
		addDefaultGroups: function() {
			defaultGroups.forEach(function(group) {
				this.add(group);
			}.bind(this));
		}
	});

	return new GroupCollection();
});
