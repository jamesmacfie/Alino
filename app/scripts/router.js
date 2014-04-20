'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'models/settings',
	'models/temperature',
	'views/container',
	'views/home',
	'views/settings',
	'views/temperature',
	'views/timer',
	'views/startBrew',
	'views/recipes',
], function($, _, Backbone, SettingsModel, TemperatureModel, ContainerView, HomeView, SettingsView, TemperatureView, TimerView, StartBrewView, RecipesView){
	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'settings': 'settings',
			'temperature': 'temperature',
			'timer': 'timer',
			'recipes': 'recipes',
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

		Backbone.router = appRouter;

		Backbone.history.start({
			pushState: true
		});
	};
	return {
		initialize: initialize
	};
});
