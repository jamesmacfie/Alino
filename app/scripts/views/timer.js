'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/popup',
	'collections/timers',
], function ($, _, Backbone, JST, Popup, Timers) {
	var TimerView = Backbone.View.extend({
		el: '#timerContainer',
		events: {
			'click .js-toggleTimerSettings': 'toggleTimerSettingsClickHandler',
			'click .js-addNewTimer': 'addNewTimerClickHandler',
			'click .js-deleteTimer': 'deleteTimerClickHandler',
			'change input': 'inputChangeHandler'
		},
		template: JST['app/scripts/templates/timer.ejs'],
		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function() {
			this.listenTo(Timers, 'add', this.render);
		},
		render: function() {
			this.renderPage();
		},
		renderPage: function() {
			var orderReverseByStartValue = function(el) {
				return el.get('startValue') * -1;
			};

			this.$el.html(this.template({
				timers: _.sortBy(Timers.models, orderReverseByStartValue)
			}));
		},
		toggleTimerSettingsClickHandler: function(event) {
			var $settings = $(event.currentTarget).parents('.timerSettings'),
				id = $settings.parents('.timer').data('id'),
				model = _.find(Timers.models, function(t){ return t.get('id') === id; }),
				uiOpen;

			if ($settings.hasClass('js-timerSettingsClosed')) {
				this.openTimerSettings($settings);
				uiOpen = true;
			} else {
				this.closeTimerSettings($settings);
				uiOpen = false;
			}

			model.set({
				uiOpen: uiOpen
			});

			this.render();
			Timers.saveToLocalStorage();
		},
		openTimerSettings: function($el) {
			var $next = $el.next(),
				$firstChild = $next.children().first();

			$el.animate({
				height: 0
			});

			$next.animate({
				height: $firstChild.height()
			});
		},
		closeTimerSettings: function($el) {
			var $prev = $el.prev(),
				$firstChild = $prev.children().first();

			$el.animate({
				height: 0
			});

			$prev.animate({
				height: $firstChild.height()
			});
		},
		inputChangeHandler: function(event) {
			var $timerEl = $(event.currentTarget).parents('.timer'),
				id = $timerEl.data('id'),
				active = $timerEl.find('.timerActiveInput').is(':checked'),
				label = $timerEl.find('.timerLabelInput').val(),
				startValue = $timerEl.find('.timerStartValueInput').val(),
				notification = $timerEl.find('.timerNotificationInput').is(':checked'),
				sms = $timerEl.find('.timerSMSInput').is(':checked'),
				model =  _.find(Timers.models, function(t){ return t.get('id') === id; });

			model.set({
				active: active,
				label: label,
				startValue: startValue,
				notification: notification,
				sms: sms
			});

			this.render();
			Timers.saveToLocalStorage();
		},
		addNewTimerClickHandler: function() {
			Timers.addNewTimer();
			Timers.saveToLocalStorage();
		},
		deleteTimerClickHandler: function(event) {
			var me = this,
				$target = $(event.currentTarget);

			var areYouSurePopup = new Popup('Are you sure?', 'Are you sure you want to delete this timer?', function() {
				me.deleteTimer($target);
				this.destroy();
			}, function() {
				this.destroy();
			});

			areYouSurePopup.show();
		},
		deleteTimer: function($el) {
			var $timer = $el.parents('.timer'),
				id = $timer.data('id');

			Timers.removeTimer(id);
			Timers.saveToLocalStorage();
			this.render();
		}
	});

	return TimerView;
});
