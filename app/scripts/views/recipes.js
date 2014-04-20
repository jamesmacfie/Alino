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
			'click .js-deleteRecipe': 'onDeleteRecipeClickHandler'
		},
		initialize: function() {

		},
		render: function() {
			this.$el.html(this.template({
				recipes: Recipes.models
			}));
		},
		onDeleteRecipeClickHandler: function(event) {
			var $target = $(event.currentTarget),
				id = $target.parents('.recipeStep').data('id'),
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
		}
	});

	return RecipeView;
});
