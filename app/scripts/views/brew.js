'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers',
	'collections/groups'
], function ($, _, Backbone, JST, Helpers, Groups) {
	var BrewView = Backbone.View.extend({
		template: JST['app/scripts/templates/brew.ejs'],
		events: {
			'click .js-toggle-timer': 'onToggleTimerClickHandler',
			'click .js-reset-timer': 'onResetTimerClickHandler'
		},
		initialize: function() {
			var brew = window.Alino.brew.getBrewInProgress();
			// Just make sure the user has actully chosen something to brew
			if (!brew)  {
				Backbone.history.navigate('', {trigger: true});
			}

			this.model = brew;

			window.Alino.bus.on(
				'timer:change',
				this.render,
				this
			);

		},
		render: function() {
			var brew = window.Alino.brew,
				recipe = this.model,
				stepFilter = function(groupId) {
					return _.filter(recipe.get('steps'), function(step) {
						return step.get('groupId') === groupId;
					});
				};

			var stepMapper = function(step) {
				return {
					id: step.id,
					description: step.get('description'),
					groupId: step.get('groupId'),
					name: step.get('name'),
					notification: step.get('notification'),
					order: step.get('order'),
					sms: step.get('sms'),
					targetTemp: step.get('targetTemp'),
					time: step.get('time'),
					summary: step.generateSummary()
				};
			};

			var groupMapper = function(group) {
				return {
						id: group.id,
						name: group.get('name'),
						order: group.get('order'),
						steps: _.sortBy(_.map(stepFilter(group.id), stepMapper), 'order')
					};
			};

			var groupFilter = function(group) {
				return !!group.steps.length;
			};

			this.$el.html(this.template({
				description: this.model.get('description'),
				groups: _.filter(_.map(Groups.models, groupMapper), groupFilter),
				timerActive: brew.getTimerState(),
				currentTime: brew.getRemainingTime(true)
			}));
		},
		afterRender: function() {
			Helpers.setTitleInfo({
				name: this.model.get('name'),
				icon: 'home',
				backgroundColor: 'blue'
			});
		},
		beforeClose: function() {
			window.Alino.bus.off(
				'timer:change',
				this.render,
				this
			);
		},
		setToggleTimerIcon: function(state) {
			var $toggleButton = $('.js-toggle-timer'),
				$toggleIcon = $toggleButton.find('i');

			$toggleIcon.removeClass('icon-play icon-pause');
			if (state) {
				$toggleIcon.addClass('icon-pause');
			} else {
				$toggleIcon.addClass('icon-play');
			}
		},
		onToggleTimerClickHandler: function(event) {
			var state = window.Alino.brew.toggleTimer();
			this.setToggleTimerIcon(state);
		},
		onResetTimerClickHandler: function() {
			window.Alino.brew.setTimerState(false);
			this.setToggleTimerIcon(false);
		}
	});

	return BrewView;
});
