'use strict';

define([
	'jquery',
	'underscore'],
	function ($, _) {
		return {
			getIdFromTarget: function(target) {
				var $target = $(target);
				return $target.parents('.recipeStep').data('id');
			},
			brewInProgress: function() {
				return window.Alino.activeRecipe;
			},
			setBrewInProgress: function(recipe) {
				window.Alino.activeRecipe = recipe;
			},
			randomId: function() {
				return Math.floor(Math.random() * 1000000);
			},
			setTitleInfo: function(config) {
				if (typeof config === 'undefined') {
					throw new Error('You need to pass a config object to set the title information');
				}

				var $titleContainer = $('#titleBar'),
					$iconClassEl = $titleContainer.find('.js-title-icon'),
					$nameClassEl = $titleContainer.find('.js-title-name');

				//Set the title's name
				if ('name' in config) {
					$nameClassEl.html(config.name);
				}

				//Set the title's icon
				if ('icon' in config) {
					$iconClassEl.removeClass (function (index, css) {
					  return (css.match (/\bicon-\S+/g) || []).join(' ');
					});
					$iconClassEl.addClass('icon-' + config.icon);
				}

				//Set the title's colour
				if ('backgroundColor' in config) {
					$titleContainer.removeClass (function (index, css) {
					  return (css.match (/\bbackground-\S+/g) || []).join(' ');
					});
					$titleContainer.addClass('background-' + config.backgroundColor);
				}
			},
			returnFromLocalStorage: function(storageKey) {
				return JSON.parse(localStorage.getItem(storageKey));
			},
			loadFromLocalStorage: function(ctx, storageKey) {
				var local = localStorage.getItem(storageKey || ctx.storageKey),
					setData = function(value) {
						var setObj = {};
						_.each(value, function(value, key) {
							setObj[key] = value;
						});

						ctx.add(setObj, {
							silent: true
						});
					};

				if (local === 'undefined') {
					return;
				}

				var data = JSON.parse(local);
				if (data) {
					_.each(data, setData);
				}
			},
			saveToLocalStorage: function(ctx, storageKey) {
				var objectToSave = [];

				_.each(ctx.models, function(model) {
					objectToSave.push(model.attributes);
				});

				localStorage.setItem(storageKey || ctx.storageKey, JSON.stringify(objectToSave));
			},
			displayErrors: function(errors) {
				var errorBox = $('#errors'),
					displayHtml = '';

				if (!errorBox.length) {
					console.error('There\'s no error box on the page!');
					return;
				}

				errors.forEach(function(err) {
					displayHtml += '<li class="errors--error">' + err + '</li>';
				});

				errorBox.html('<ul class="errors">' + displayHtml + '</ul>');
				errorBox.show();
			},
			validateTemp: function(temp) {
				var type = typeof temp;

				if (type !== 'number' && type !== 'string') {
					throw new Error('We can only convert numbers/strings');
				}
				if (type === 'string') {
					temp = parseFloat(temp);
				}
				return temp;
			},
			celciusToFahrenheit: function(temp){
				var returnVal;

				temp = this.validateTemp(temp);

				returnVal = (temp * (9/5)) + 32;

				return parseFloat(returnVal.toFixed(2));
			},
			fahrenheitToCelcius: function(temp){
				var returnVal;

				temp = this.validateTemp(temp);

				returnVal = (temp -32) * (5/9);

				return parseFloat(returnVal.toFixed(2));
			}
		};
	}
);
