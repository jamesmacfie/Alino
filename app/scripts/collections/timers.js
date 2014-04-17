/*global define*/

define([
		'underscore',
		'backbone',
		'models/timer',
		'modules/helpers'
], function (_, Backbone, Timer, Helpers) {
		'use strict';

		var TimerCollection = Backbone.Collection.extend({
			model: Timer,
			active: false,
			timeElapsed: 0,
			initialize: function() {
				window.Timers = this;
				this.loadFromLocalStorage();
				this.startTimer();
			},
			loadFromLocalStorage: function() {
				var local = localStorage.getItem('bTimers');
				if (local === 'undefined') {
					return;
				}

				var data = JSON.parse(local);
				if (data) {
					_.each(data, function(value) {
						var setObj = {};
						_.each(value, function(value, key) {
							setObj[key] = value;
						}.bind(this));

						this.add(setObj, {
							silent: true
						});

					}.bind(this));
				}
			},
			saveToLocalStorage: function() {
				var objectToSave = [];

				_.each(this.models, function(model) {
					objectToSave.push(model.attributes);
				});

				localStorage.setItem('bTimers', JSON.stringify(objectToSave));
			},
			timeRemaining: function() {
				var largest = this.largestTimer();

				if (largest === 0) {
					return 0;
				}

				return (largest.get('startValue') * 60) - this.timeElapsed;
			},
			startTimer: function() {
				window.setInterval(function() {
					if (this.active) {
						this.increaseTimer();
					}
				}.bind(this), 1000);
			},
			increaseTimer: function() {
				if (this.timeRemaining() > 0) {
					this.timeElapsed++;
					this.trigger('change');
				} else {
					this.active = false;
					this.trigger('change');
				}
				this.activatingTimer();
			},
			activatingTimer: function() {
				var remaining = this.timeRemaining(),
					remainingMinutes = remaining / 60,
					timerMinuteCheck = function(t) {
						return t.get('startValue') == remainingMinutes;
					},
					activeTimer = _.find(this.models, timerMinuteCheck);

				if (typeof activeTimer !== 'undefined') {
					activeTimer.notify();
				}

			},
			nextTimer: function() {
				var remaining = this.timeRemaining(),
					activeFilter = function(t) {
						return t.get('active');
					},
					filteredModels = _.filter(this.models, activeFilter),
					smallestRemainingTime = function(prev, curr) {
						var getRemainingTime = function(obj) {
								return remaining - (obj.get('startValue') * 60);
							}.bind(this),
							currRemainingTime,
							prevRemainingTime;

						if (typeof curr  === 'number' || typeof prev === 'number') {
							//Fix up - this is a bit shit
							if (typeof curr === 'object') {
								currRemainingTime = getRemainingTime(curr);
								if (currRemainingTime < 0) {
									return prev;
								}
							}
							return curr;
						}

						currRemainingTime = getRemainingTime(curr);
						prevRemainingTime = getRemainingTime(prev);

						return (currRemainingTime < prevRemainingTime || prevRemainingTime < 0) ? curr : prev;
					};

				return _.reduce(filteredModels, smallestRemainingTime, 0, this);
			},
			largestTimer: function() {
				var activeFilter = function(t) {
						return t.get('active');
					},
					filteredModels = _.filter(this.models, activeFilter),
					largestStartValue = function(prev, curr) {
						if (typeof curr  === 'number' || typeof prev === 'number') {
							return curr;
						}

						return (curr.get('startValue') > prev.get('startValue')) ? curr : prev;
					};
				return _.reduce(filteredModels, largestStartValue, 0);
			},
			toggleTimer: function() {
				this.active = !this.active;
				this.trigger('change');
			},
			resetTimer: function() {
				this.timeElapsed = 0;
				this.active = false;
				this.trigger('change');
			},
			addNewTimer: function() {
				this.add({
					id: Helpers.id(),
					active: true,
					label: 'New timer',
					notification: true,
					startValue: 0,
					sms: false,
					uiOpen: true
				});
			},
			removeTimer: function(id) {
				this.remove(this.get(id));
			}

		});

		return new TimerCollection();
});
