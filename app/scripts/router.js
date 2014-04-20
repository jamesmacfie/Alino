'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'models/settings',
	'models/temperature',
	'collections/recipes',
	'views/container',
	'views/home',
	'views/settings',
	'views/temperature',
	'views/timer',
	'views/startBrew',
	'views/recipes',
	'views/recipe',
], function($, _, Backbone, SettingsModel, TemperatureModel, Recipes, ContainerView, HomeView, SettingsView, TemperatureView, TimerView, StartBrewView, RecipesView, RecipeView){
	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'settings': 'settings',
			'temperature': 'temperature',
			'timer': 'timer',
			'recipes': 'recipes',
			'recipe/:id': 'recipe',
			'start': 'startBrew'
		}
	});

	var initialize = function(){
		var appRouter = new AppRouter(),
			homeView = new HomeView(),
			settingsView = new SettingsView({
				model: SettingsModel
			}),
			temperatureView = new TemperatureView({
				model: TemperatureModel
			}),
			timerView = new TimerView(),
			containerView = new ContainerView(),
			startBrewView = new StartBrewView(),
			recipesView = new RecipesView();

		appRouter.on('route:home', function(){
			containerView.changeView(homeView);
		});

		appRouter.on('route:settings', function(){
			containerView.changeView(settingsView);
		});

		appRouter.on('route:temperature', function(){
			containerView.changeView(temperatureView);
		});

		appRouter.on('route:timer', function(){
			containerView.changeView(timerView);
		});

		appRouter.on('route:startBrew', function(){
			containerView.changeView(startBrewView);
		});

		appRouter.on('route:recipes', function(){
			containerView.changeView(recipesView);
		});

		appRouter.on('route:recipe', function(id){
			var recipe  = Recipes.get(id),
				recipeView = new RecipeView({
					model: recipe
				});
			containerView.changeView(recipeView);
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
