'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'views/titleBar',
], function ($, _, Backbone, JST, TitleBarView) {
	var ContainerView = Backbone.View.extend({
		template: JST['app/scripts/templates/home.ejs'],
		initialize: function() {
			this.titleBar = new TitleBarView();
			this.bindEvents();
		},
		bindEvents: function() {
			$(document).on('click', '.js-toggle-menu', this.toggleNavigation.bind(this));
		},
		changeView: function(View) {
			$('.container').html('').hide();

			this.page = View;
			this.render();
		},
		render: function() {
			this.renderTitleBar();
			this.renderPage();
		},
		renderTitleBar: function() {
			this.titleBar.render();
		},
		renderPage: function() {
			this.page.$el.show();
			this.page.render();
		},
		toggleNavigation: function() {
			var $body = $('body');

			if (!$body.hasClass('showNavigation')) {
				$('#container').append('<div id="overlay" class="overlay js-toggle-menu"></div>');
			} else {
				$('#overlay').remove();
			}

			$('body').toggleClass('showNavigation');
		}
	});

	return ContainerView;
});
