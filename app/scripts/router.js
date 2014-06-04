'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'modules/helpers',
	'collections/recipes',
	'collections/steps',
	'models/step',
	'views/home',
	'views/temperature',
	'views/recipe',
	'views/recipes',
	'views/step',
	'views/tools',
	'views/notifications',
	'views/settings'
], function($, _, Backbone, Helpers, Recipes, Steps, Step, HomeView, TemperatureView, RecipeView, RecipesView, StepView, ToolsView, NotificationsView, SettingsView){
	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'temperature': 'temperature',
			'recipes': 'recipes',
			'recipe/new': 'newRecipe',
			'recipe/edit/:recipeId': 'editRecipe',
			'recipe/edit/:recipeId/step/:stepId': 'editStep',
			'recipe/edit/:recipeId/step/new/:groupId': 'newStep',
			'tools': 'tools',
			'notifications': 'notifications',
			'settings': 'settings'
		}
	});

	var AppView = function() {
		this.showView = function(view) {
			if (this.currentView && 'beforeClose' in this.currentView){
				this.currentView.beforeClose();
			}

			this.currentView = view;
			this.currentView.render();

			$('#main').html(this.currentView.el);

			if ('afterRender' in this.currentView) {
				this.currentView.afterRender();
			}
		};
	};

	var initialize = function(){
		var appRouter = new AppRouter(),
			appView = new AppView();

		appRouter.on('route:home', function(){
			appView.showView(new HomeView());
		});

		appRouter.on('route:temperature', function(){
			appView.showView(new TemperatureView());
		});

		appRouter.on('route:recipes', function(){
			appView.showView(new RecipesView());
		});

		appRouter.on('route:newRecipe', function(){
			appView.showView(new RecipesView());
		});

		appRouter.on('route:editRecipe', function(id){
			var recipe  = Recipes.get(id),
				recipeView = new RecipeView({
					model: recipe
				});
			appView.showView(recipeView);
		});

		appRouter.on('route:editStep', function(recipeId, stepId){
			var step  = Steps.get(stepId),
				stepView = new StepView({
					model: step
				});
			stepView.recipe = Recipes.get(recipeId);
			appView.showView(stepView);
		});

		appRouter.on('route:newStep', function(recipeId, groupId){
			var step  = new Step({
					name: '',
					groupId: parseInt(groupId)
				}),
				stepView = new StepView({
					model: step
				});

			stepView.recipe = Recipes.get(recipeId);
			stepView.newStep = true;
			appView.showView(stepView);
		});

		appRouter.on('route:tools', function(){
			appView.showView(new ToolsView());
		});

		appRouter.on('route:notifications', function(){
			appView.showView(new NotificationsView());
		});

		appRouter.on('route:settings', function(){
			appView.showView(new SettingsView());
		});

		Backbone.router = appRouter;

		Backbone.history.start({
			pushState: true
		});
	};


	return {
		initialize: initialize
	};
});
