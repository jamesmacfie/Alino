'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers',
	'collections/recipes'
], function ($, _, Backbone, JST, Helpers, Recipes) {
	var HomeView = Backbone.View.extend({
		startTemplate: JST['app/scripts/templates/homeStart.ejs'],
		selectTemplate: JST['app/scripts/templates/homeSelect.ejs'],
		events: {
			'click .js-createRecipe': 'onCreateRecipeClickHandler',
			'click .js-loadDefaults': 'onLoadDefaultsClickHandler',
			'click .js-viewRecipes': 'onViewRecipesClickHandler'
		},
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function() {

		},
		render: function() {
			if (!window.Alino.brew.getBrewInProgress()) {
				this.$el.html(this.startTemplate({
					recipeCount: Recipes.length
				}));
				return;
			}
			Backbone.history.navigate('letsBrew', {trigger: true});
		},
		afterRender: function() {
			Helpers.setTitleInfo({
				name: 'Home',
				icon: 'home',
				backgroundColor: 'blue'
			});
		},
		onCreateRecipeClickHandler: function() {
			Backbone.history.navigate('recipe/new/first', {trigger: true});
		},
		onViewRecipesClickHandler: function() {
			Backbone.history.navigate('recipes', {trigger: true});
		},
		onLoadDefaultsClickHandler: function() {
			Recipes.resetToDefault();
			Backbone.history.navigate('recipes', {trigger: true});
		}
	});

	return HomeView;
});
