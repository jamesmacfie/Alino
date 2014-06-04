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
			'click .js-save-recipe': 'onSaveRecipeClickHandler'
		},
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function() {

		},
		render: function() {
			var stepFilter = function(groupId) {
				return _.filter(Steps.models, function(step) {
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
				groupId = $target.parents('.group').data('id');

			Backbone.history.navigate('recipe/edit/' + this.model.get('id') + '/step/new/' + groupId, {trigger: true});
		},
		onSaveRecipeClickHandler: function(event) {
			var name = $('[data-property="name"]').val(),
				description = $('[data-property="description"]').val(),
				validated = true; //this.validateForm(name, description);

			if (validated) {
				this.model.set({
					name: name,
					description: description
				});

				if (this.newRecipe) {
					//Give this new recipe a random ID and save it to the recipe collection
					this.model.set('id', Helpers.randomId());
					Recipes.add(this.model);
					Recipes.saveToLocalStorage();
				}
			} else {
				console.log('SHIT!');
			}
		},
		validateForm: function() {
			console.log('Validate the recipe here');
			return true;
		}
	});

	return RecipeView;
});
