'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers',
	'collections/groups',
	'collections/steps',
	'collections/recipes',
	'libs/html.sortable',
], function ($, _, Backbone, JST, Helpers, Groups, Steps, Recipes) {
	var RecipeView = Backbone.View.extend({
		template: JST['app/scripts/templates/recipe.ejs'],
		events: {
			'click .js-edit-step': 'onEditStepClickHandler',
			'click .js-new-step': 'onNewStepClickHandler',
			'click .js-save-recipe': 'onSaveRecipeClickHandler',
			'click .js-cancel-recipe': 'onCancelRecipeClickHandler'
		},
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function() {

		},
		render: function() {
			var recipe = this.model,
				stepFilter = function(groupId) {
					return _.filter(recipe.get('steps'), function(step) {
						return step.get('groupId') === groupId;
					});
				};

			var stepMapper = function(step) {
				return {
					id: step.id,
					description: step.get('description'),
					groupId: step.get('groupId'),
					name: step.get('name'),
					notification: step.get('notification'),
					order: step.get('order'),
					sms: step.get('sms'),
					targetTemp: step.get('targetTemp'),
					time: step.get('time'),
				};
			};

			var groupMapper = function(group) {
				return {
						id: group.id,
						name: group.get('name'),
						order: group.get('order'),
						steps: _.sortBy(_.map(stepFilter(group.id), stepMapper), 'order')
					};
			};

			this.$el.html(this.template({
				name: this.model.get('name'),
				description: this.model.get('description'),
				groups: _.map(Groups.models, groupMapper)
			}));

		},
		afterRender: function() {
			var me = this;

			Helpers.setTitleInfo({
				name: this.model.get('name'),
				icon: 'recipes',
				backgroundColor: 'pink'
			});

			$('.sortable').sortable({
				items: '.js-recipe-order',
				placeholder : '<div class="recipeStep--sortable"></div>'
			}).bind('sortupdate', me.updateNumberedItems);
		},
		updateNumberedItems: function(event) {
			//Update the sort numbers in the sort parent
			var $target = $(event.currentTarget);

			$target.find('.js-recipe-order').each(function(i, el) {
				$(el).find('.iconHolder--iconText').text(i++);
			});
		},
		onEditStepClickHandler: function(event) {
			var $target = $(event.currentTarget),
				stepId = $target.parents('.recipeStep').data('id');

			Backbone.history.navigate('recipe/edit/' + this.model.get('id') + '/step/' + stepId, {trigger: true});
		},
		onNewStepClickHandler: function(event) {
			var $target = $(event.currentTarget),
				groupId = $target.parents('.group').data('id'),
				colRecipe = Recipes.get(this.model.id);

				if (colRecipe) {
					colRecipe = this.model;
				} else {
					Recipes.add(this.model);
				}

			Backbone.history.navigate('recipe/edit/' + this.model.get('id') + '/step/new/' + groupId, {trigger: true});
		},
		onSaveRecipeClickHandler: function() {
			var name = $('[data-property="name"]').val(),
				description = $('[data-property="description"]').val(),
				validation = this.validateForm(name, description),
				colRecipe = Recipes.get(this.model.id);

			if (validation.success) {
				this.model.set({
					name: name,
					description: description
				});

				if (colRecipe) {
					colRecipe = this.model;
				} else {
					Recipes.add(this.model);
				}

				Recipes.saveToLocalStorage();
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
		onCancelRecipeClickHandler: function() {
			Recipes.clean();
		}
	});

	return RecipeView;
});
