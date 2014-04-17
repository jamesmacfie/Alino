'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates'
], function ($, _, Backbone, JST) {
	var TitleBarView = Backbone.View.extend({
		el: '#titleContainer',
		template: JST['app/scripts/templates/titleBar.ejs'],
		initialize: function() {
		},
		render: function() {
			this.$el.html(this.template({
				title: Backbone.history.fragment.toLowerCase() || 'home'
			}));
		}
	});

	return TitleBarView;
});
