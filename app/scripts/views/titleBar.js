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
			var fragmentPart = new RegExp(/[^//]*/),
				title = Backbone.history.fragment.toLowerCase().match(fragmentPart)[0]

			this.$el.html(this.template({
				title: title || 'home'
			}));
		}
	});

	return TitleBarView;
});
