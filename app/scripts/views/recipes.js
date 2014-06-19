'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers',
	'collections/recipes',
	'modules/popup'
], function ($, _, Backbone, JST, Helpers, Recipes, Popup) {
	var RecipesView = Backbone.View.extend({
		template: JST['app/scripts/templates/recipes.ejs'],
		events: {
			'click .js-deleteRecipe': 'onDeleteRecipeClickHandler',
			'click .js-editRecipe': 'onEditRecipeClickHandler',
			'click .js-createRecipe': 'onCreateRecipeClickHandler',
			'click .js-useRecipe': 'onUseRecipeClickHandler'
		},
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function() {

		},
		render: function() {
			this.$el.html(this.template({
				recipes: Recipes.models
			}));
		},
		afterRender: function() {
			Helpers.setTitleInfo({
				name: 'Recipes',
				icon: 'recipes',
				backgroundColor: 'pink'
			});
		},
		onDeleteRecipeClickHandler: function(event) {
			var id = Helpers.getIdFromTarget(event.currentTarget),
				me = this,
				areYouSurePopup = new Popup('Are you sure?',
					'Are you sure you want to delete this recipe?',
					function() {
						Recipes.remove(id);
						Recipes.saveToLocalStorage();
						me.render();
						this.destroy();
					},
					function() {
						this.destroy();
					});
				areYouSurePopup.show();
		},
		onEditRecipeClickHandler: function(event) {
			var id = Helpers.getIdFromTarget(event.currentTarget);
			Backbone.history.navigate('recipe/edit/' + id, {trigger: true});
		},
		onCreateRecipeClickHandler: function() {
			Backbone.history.navigate('recipe/new', {trigger: true});
		},
		onUseRecipeClickHandler: function(event) {
			var id = Helpers.getIdFromTarget(event.currentTarget),
				recipe = Recipes.get(id),
				setBrew = function() {
					Helpers.setBrewInProgress(recipe);
				},
				replaceBrewPopup = new Popup('Replace the current recipe?',
					'There\'s alread a recipe set as active. Are you sure you want to replace it?',
					function() {
						setBrew();
						this.destroy();
					},
					function() {
						this.destroy();
					});

			if (!Helpers.brewInProgress()) {
				setBrew();
				Backbone.history.navigate('', {trigger: true});
			} else {
				replaceBrewPopup.show();
			}
		}
	});

	return RecipesView;
});
