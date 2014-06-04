'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers',
	'collections/recipes',
	'collections/groups',
	'collections/steps',
	'libs/html.sortable'
], function ($, _, Backbone, JST, Helpers, Recipes, Groups, Steps) {
	var RecipeView = Backbone.View.extend({
		template: JST['app/scripts/templates/step.ejs'],
		events: {
			'click .js-clear-input': 'onInputClearClickHandler',
			'click .js-save-step': 'onSaveStepClickHandler'
		},
		initialize: function() {
			this.setDefaults();
			this.bindEvents();
		},
		bindEvents: function() {

		},
		setDefaults: function() {
			var model = this.model;
			function setUndefinedProperty(prop) {
				if (model.get(prop) === null) {
					model.set(prop, 0);
				}
			}
			['targetTemp', 'time'].forEach(setUndefinedProperty);
		},
		render: function() {
			this.$el.html(this.template({
				name: this.model.get('name'),
				description: this.model.get('description'),
				targetTemp: this.model.get('targetTemp'),
				time: this.model.get('time'),
				sms: this.model.get('sms'),
				notification: this.model.get('notification'),
				recipe: {
					id: this.recipe.id,
					name: this.recipe.get('name')
				}
			}));

		},
		afterRender: function() {
			Helpers.setTitleInfo({
				name: this.model.get('name'),
				icon: 'step',
				backgroundColor: 'pink'
			});
		},
		onInputClearClickHandler: function(event) {
			var $target = $(event.currentTarget),
				$input = $target.prev();

			$input.val(0);
		},
		onSaveStepClickHandler: function() {
			var name = $('[data-property="name"]').val(),
				description = $('[data-property="description"]').val(),
				targetTemp = parseFloat($('[data-property="targetTemp"]').val() || 0, 2),
				time = parseFloat($('[data-property="time"]').val() || 0, 2),
				sms = $('[data-property="sms"]').is(':checked'),
				notification = $('[data-property="notification"]').is(':checked'),
				validated = true; //this.validateForm(name);

			if (validated) {
				this.model.set({
					name: name,
					description: description,
					targetTemp: targetTemp,
					time: time,
					sms: sms,
					notification: notification
				});

				if (this.newStep) {
					//Give this new step a random ID and save it to the recipe and Step collections
					this.model.set('id', Helpers.randomId());
					this.addToCollections();
				}
			} else {
				console.log('FUCKFUCKFUCK!') ;
			}
		},
		validateForm: function() {
			console.log('Validate the step here');
			return true;
		},
		addToCollections: function() {
			//Add step to collection and save to local storage
			Steps.add(this.model);
			Steps.saveToLocalStorage();

			//Add to recipe and save recipes collection to local storage
			this.recipe.get('steps').push(this.model.id);
			Recipes.saveToLocalStorage();
		}
	});

	return RecipeView;
});
