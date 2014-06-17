'use strict';

define([
	'jquery',
	'templates'
	], function ($, JST) {
	var popup = function(title, message, okHandler, cancelHandler){
		this.title = title;
		this.message = message;
		this.okHandler = okHandler;
		this.cancelHandler = cancelHandler;
		this.template =  JST['app/scripts/templates/popup.ejs'];
	};

	var center = function() {
		var $window = $(window),
			$popup = $(this.currentPopup),
			windowX = $window.innerWidth(),
			windowY = $window.innerHeight(),
			popupX = $popup.innerWidth(),
			popupY = $popup.innerHeight(),
			absX = (windowX / 2) - (popupX / 2),
			absY = (windowY / 2) - (popupY / 2);

		$(this.currentPopup).css('left', absX);
		$(this.currentPopup).css('top', absY);
	};

	var bindEvents = function() {
		$('.js-popupOk').on('click', this.okHandler.bind(this));
		$('.js-popupCancel').on('click', this.cancelHandler.bind(this));
	};

	var removeEvents = function() {
		$('.js-popupOk').off('click', this.okHandler.bind(this));
		$('.js-popupCancel').off('click', this.cancelHandler.bind(this));
	};

	popup.prototype.show = function(){
		var showCompleteHander = bindEvents.bind(this),
			template = $(this.template({
				title: this.title,
				message: this.message
			}));

		this.currentOverlay  = template[0];
		this.currentPopup  = template[2];

		$('body').prepend([this.currentOverlay, this.currentPopup]);

		center.call(this);

		$(this.currentPopup).show({
			duration: 0,
			complete: function() {
				showCompleteHander();
			}
		});
	};

	popup.prototype.destroy = function() {
		removeEvents.call(this);
		this.currentOverlay.remove();
		this.currentPopup.remove();
	};

	return popup;
});
