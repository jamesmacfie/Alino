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
			'click .js-createRecipe': 'onCreateRecipeClickHandler'
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
		getIdFromTarget: function(target) {
			var $target = $(target);
			return $target.parents('.recipeStep').data('id');
		} ,
		onDeleteRecipeClickHandler: function(event) {
			var id = this.getIdFromTarget(event.currentTarget),
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
			var id = this.getIdFromTarget(event.currentTarget);
			Backbone.history.navigate('recipe/edit/' + id, {trigger: true});
		},
		onCreateRecipeClickHandler: function() {
			Backbone.history.navigate('recipe/new', {trigger: true});
		}
	});

	return RecipesView;
});
