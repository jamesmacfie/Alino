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
], function($, _, Backbone, SettingsModel, TemperatureModel, ContainerView, HomeView, SettingsView, TemperatureView, TimerView){
	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'settings': 'settings',
			'temperature': 'temperature',
			'timer': 'timer'
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
			containerView = new ContainerView();

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

		Backbone.history.start({
			pushState: true
		});
	};
	return {
		initialize: initialize
	};
});
