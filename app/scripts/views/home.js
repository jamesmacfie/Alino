'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'libs/Chart',
	'models/temperature',
	'collections/timers'
], function ($, _, Backbone, JST, Chart, Temperature, Timers) {
	var HomeView = Backbone.View.extend({
		el: '#homeContainer',
		defaultTemplate: JST['app/scripts/templates/homeDefault.ejs'],
		currentTemperatureEl: '#temperatureCurrent',
		currentTemperatureTemplate: JST['app/scripts/templates/homeCurrentTemperature.ejs'],
		historyTemperatureEl: '#temperatureHistory',
		historyTemperatureTemplate: JST['app/scripts/templates/homeHistoryTemperature.ejs'],
		timerEl: '#timer',
		timerTemplate: JST['app/scripts/templates/homeTimer.ejs'],
		events: {
			'click .js-toggle-timer': 'onToggleTimerClick',
			'click .js-reset-timer': 'onResetTimerClick',
			'click .js-start-brew': 'onStartBrewClick'
		},
		initialize: function() {
			this.bindEvents();

		},
		resetUI: function() {
			var current = $('<div>', {
					id: 'temperatureCurrent'
				}),
				history = $('<div>', {
					id: 'temperatureHistory'
				}),
				timer = $('<div>', {
					id: 'timer'
				});

			this.$el.html('');

			current.appendTo(this.$el);
			history.appendTo(this.$el);
			timer.appendTo(this.$el);
		},
		bindEvents: function() {
			this.listenTo(Temperature, 'change', this.onTemperatureModelChange);
			this.listenTo(Timers, 'change', this.onTimerChange);
		},
		render: function() {
			if (!window.Alino.activeRecipe) {
				Backbone.history.navigate('start', {trigger: true, replace: true});
			} else {
				this.resetUI();
				this.renderCurrentTemperature();
				this.renderHistoryTemperature();
				this.renderTimer();
			}
		},
		renderDefault: function() {
			this.$el.html(this.defaultTemplate());
		},

		renderCurrentTemperature: function() {
			$(this.currentTemperatureEl).html(this.currentTemperatureTemplate({
				current: Temperature.get('current'),
				desired: Temperature.get('desired'),
				status: Temperature.status()
			}));
		},
		renderHistoryTemperature: function() {
			$(this.historyTemperatureEl).html(this.historyTemperatureTemplate({
				historyTimestamp: Temperature.get('historyTimestamp')
			}));
			this.renderChart(Temperature.get('curatedHistory'));
		},
		renderTimer: function() {
			var formatTimeRemaining = function() {
					var timeRemaining = Timers.timeRemaining(),
						minutes = Math.floor(timeRemaining / 60),
						seconds = timeRemaining - (minutes * 60),
						formatLeadingZero = function(val) {
							 return (val < 10) ? '0' + val : val;
						};
					return formatLeadingZero(minutes) + ':' + formatLeadingZero(seconds);
				},
				next = Timers.nextTimer();

			$(this.timerEl).html(this.timerTemplate({
				active: Timers.active,
				nextTimerLabel: next !== 0 ? next.get('label') : 'No next timer',
				nextTimerStartValue: next !== 0 ? next.get('startValue') : 0,
				timeToNextTimer: formatTimeRemaining()
			}));
		},
		renderChart: function(history) {
			var labels = _.map(history, function() {
					return '';
				}),
				datasets = [
					{
						fillColor : 'rgba(0,0,0,0)',
						strokeColor : '#19c614',
						pointColor : '#14bc0f',
						pointStrokeColor : '#09aa04',
						data : history
					}
				],
				config = {
					animation: false,
					scaleOverride: true,
					scaleStartValue: 0,
					scaleStepWidth: 20,
					scaleSteps: 5
				};

			var lineChartData = {
				labels : labels,
				datasets : datasets
			};

			new Chart(document.getElementById('canvas').getContext('2d')).Line(lineChartData, config);
		},
		onStartBrewClick: function() {
			Backbone.history.navigate('start', {trigger: true, replace: true});
		},
		onTimerChange: function() {
			if (Backbone.history.fragment === '') {
				this.renderTimer();
			}
		},
		onTemperatureModelChange: function() {
			if (Backbone.history.fragment === '') {
				this.renderCurrentTemperature();
				this.renderHistoryTemperature();
			}
		},
		onToggleTimerClick: function() {
			Timers.toggleTimer();
		},
		onResetTimerClick: function() {
			Timers.resetTimer();
		}
	});

	return HomeView;
});
