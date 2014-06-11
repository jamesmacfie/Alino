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
		defaultTemplate: JST['app/scripts/templates/home.ejs'],
		startTemplate: JST['app/scripts/templates/homeStart.ejs'],
		selectTemplate: JST['app/scripts/templates/homeSelect.ejs'],
		events: {
			'click .js-createRecipe': 'onCreateRecipeClickHandler',
			'click .js-loadDefaults': 'onLoadDefaultsClickHandler'
		},
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function() {

		},
		render: function() {
			if (!Helpers.brewInProgress()) {
				this.$el.html(this.startTemplate({
					recipeCount: Recipes.length
				}));
				return;
			}
			this.$el.html(this.defaultTemplate());
		},
		afterRender: function() {
			Helpers.setTitleInfo({
				name: 'Home',
				icon: 'home',
				backgroundColor: 'blue'
			});
		},
		onCreateRecipeClickHandler: function(event) {
			Backbone.history.navigate('recipe/new/first', {trigger: true});
		},
		onLoadDefaultsClickHandler: function(event) {

		}
	});

	return HomeView;
});
