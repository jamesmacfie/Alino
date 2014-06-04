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
		},
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function() {

		},
		render: function() {
			if (!window.Alino.activeRecipe) {
				//console.log(Recipes);
				this.$el.html(this.startTemplate());
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
		}
	});

	return HomeView;
});
