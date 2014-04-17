/*global define*/
'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'router',
], function($, _, Backbone, Router){
	var initialize = function(){
		Router.initialize();
		bindEvents();

		Backbone.history.navigate('', {trigger: true});
	};

	var bindEvents = function() {
		//Setup global bus
		Backbone.bus = _.extend({}, Backbone.Events);

		//Ensure anchor tags use the history API
		$(document).on('click', 'a[href^="/"]', function(event) {
			event.preventDefault();
			Backbone.history.navigate($(this).attr('href'), {trigger: true});
		});
	};

	return {
		initialize: initialize
	};
});
