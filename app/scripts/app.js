/*global define, Alino*/
'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'controllers/brew'
], function($, _, Backbone, Router, Brew){
	var initialize = function(){
		//Setup namespace
		window.Alino = {};

		//Setup access to currew brew controller
		window.Alino.brew = Brew;

		Router.initialize();
		bindEvents();

		Backbone.history.navigate('', {trigger: true});
	};

	var bindEvents = function() {
		//Ensure anchor tags use the history API
		$(document).on('click', 'a[href^="/"]', function(event) {
			event.preventDefault();
			Backbone.history.navigate($(this).attr('href'), {trigger: true});
		});

		$(document).on('click', '.js-toggle-menu', function() {
			var $body = $('body');

			if (!$body.hasClass('showNavigation')) {
				$('#main').append('<div id="overlay" class="overlay js-toggle-menu"></div>');
			} else {
				$('#overlay').remove();
			}

			$('body').toggleClass('showNavigation');
		});
	};

	return {
		initialize: initialize
	};
});
