'use strict';

define([
	'jquery',
	'underscore',
	'modules/helpers'],
	function ($, _, Helpers) {
		var activeRecipe,
			timerActive = false,
			elapsedTime = 0,
			totalTime = 0,
			interval;

		function calculateTotalTime() {
			var steps = activeRecipe.get('steps'),
				counter = function(total, step) {
					return total + step.get('time');
				};

			totalTime = steps.reduce(counter, 0) * 60;
		}

		function currentStep() {
			var lastStepsTimeTotal = 0,
				steps = activeRecipe.get('steps'),
				stepLength = steps.length,
				step;

			for (var i = 0; i < stepLength; i++) {
				step = steps[i];
				lastStepsTimeTotal += step.get('time') * 60;

				if (lastStepsTimeTotal > elapsedTime) {
					return step;
				}
			}

			//We shouldnt' get here
			return;
		}

		return {
			getBrewInProgress: function() {
				return activeRecipe;
			},
			setBrewInProgress: function(recipe) {
				activeRecipe = recipe;
				calculateTotalTime();
				console.log(currentStep());
			},
			getTimerState: function() {
				return timerActive;
			},
			setTimerState: function(state) {
				timerActive = state;
				this.changeCountdownActivity();
			},
			toggleTimer: function() {
				this.setTimerState(!timerActive);
				return timerActive ? true : false;
			},
			changeCountdownActivity: function() {
				if (timerActive) {
					interval = window.setInterval(function() {
						window.Alino.bus.trigger('timer:change');
						elapsedTime++;
					}.bind(this), 1000);
				} else {
					window.clearInterval(interval);
				}
			},
			getRemainingTime: function(format) {
				var remainingTime = totalTime - elapsedTime,
					minutes = Helpers.padNumber(Math.floor( remainingTime / 60)),
					seconds = Helpers.padNumber(remainingTime % 60);

				if (format) {
					return [minutes, ':', seconds].join('');
				}

				return remainingTime;
			}

		};
	}
);
