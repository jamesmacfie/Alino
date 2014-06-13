'use strict';

define([
	'jquery',
	'underscore',
	'backbone',
	'templates',
	'modules/helpers'
], function ($, _, Backbone, JST, Helpers) {
	var PitchView = Backbone.View.extend({
		template: JST['app/scripts/templates/pitch.ejs'],
		initialize: function() {

		},
		render: function() {
			this.$el.html(this.template());
		},
		afterRender: function() {
			Helpers.setTitleInfo({
				name: 'Pitch calculator',
				icon: 'stethoscope',
				backgroundColor: 'turquoise'
			});
		}
	});

	return PitchView;
});
