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
			var name = $('[data-property="name"]').val().trim(),
				description = $('[data-property="description"]').val().trim(),
				targetTemp = parseFloat($('[data-property="targetTemp"]').val() || 0, 2),
				time = parseFloat($('[data-property="time"]').val() || 0, 2),
				sms = $('[data-property="sms"]').is(':checked'),
				notification = $('[data-property="notification"]').is(':checked'),
				validation = this.validateForm(name, description);

			if (validation.success) {
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
				Helpers.displayErrors(validation.errors);
				return false;
			}
		},
		validateForm: function(name, description) {
			var success = true,
				errors = [];

			if (!name.length) {
				errors.push('You have to enter a name');
			}

			if (!description.length) {
				errors.push('You have to enter a description');
			}

			if (errors.length) {
				success = false;
			}

			return {
				errors: errors,
				success: success
			};
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
