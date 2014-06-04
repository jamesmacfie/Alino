'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers',
	'collections/recipes'
], function ($, _, Backbone, JST, Helpers, Recipes) {
	var RecipesView = Backbone.View.extend({
		template: JST['app/scripts/templates/recipes.ejs'],
		events: {
			'click .js-deleteRecipe': 'onDeleteRecipeClickHandler',
			'click .js-editRecipe': 'onEditRecipeClickHandler'
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
			console.log('delete');
		},
		onEditRecipeClickHandler: function(event) {
			var id = this.getIdFromTarget(event.currentTarget);
			Backbone.history.navigate('recipe/edit/' + id, {trigger: true});
		}
	});

	return RecipesView;
});
