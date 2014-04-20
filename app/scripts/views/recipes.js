'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'collections/recipes',
	'modules/popup'
], function ($, _, Backbone, JST, Recipes, Popup) {
	var RecipeView = Backbone.View.extend({
		el: '#recipesContainer',
		template: JST['app/scripts/templates/recipes.ejs'],
		events: {
			'click .js-deleteRecipe': 'onDeleteRecipeClickHandler',
			'click .js-editRecipe': 'onEditRecipeClickHandler'
		},
		initialize: function() {

		},
		render: function() {
			this.$el.html(this.template({
				recipes: Recipes.models
			}));
		},
		getIdFromTarget: function(target) {
			var $target = $(target);
			return $target.parents('.recipeStep').data('id');
		} ,
		onDeleteRecipeClickHandler: function(event) {
			var id = this.getIdFromTarget(event.currentTarget),
				me = this;

			if (!id) {
				return;
			}

			var areYouSurePopup = new Popup('Are you sure?',
				'Are you sure you want to delete this recipe?',
				function() {
					Recipes.remove(id);
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
			Backbone.history.navigate('recipe/' + id, {trigger: true});
		}

	});

	return RecipeView;
});
