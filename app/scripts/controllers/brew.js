'use strict';

define([
	'jquery',
	'underscore'],
	function ($, _) {
		var activeRecipe,
			timerActive;
		return {
			getBrewInProgress: function() {
				return activeRecipe;
			},
			setBrewInProgress: function(recipe) {
				activeRecipe = recipe;
			},
			getTimerState: function() {
				return timerActive;
			},
			setTimerState: function(state) {
				timerActive = state;
			},
			toggleTimer: function() {
				timerActive = !timerActive;
				return timerActive ? true : false;
			},

		};
	}
);
