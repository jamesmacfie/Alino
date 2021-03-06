/*global require*/
'use strict';

require.config({
		shim: {
				underscore: {
						exports: '_'
				},
				backbone: {
						deps: [
								'underscore',
								'jquery'
						],
						exports: 'Backbone'
				},
				bootstrap: {
						deps: ['jquery'],
						exports: 'jquery'
				}
		},
		paths: {
				jquery: '../bower_components/jquery/jquery',
				backbone: '../bower_components/backbone/backbone',
				underscore: '../bower_components/underscore/underscore',
				text: '../bower_components/requirejs-text/text',
				moment: '../bower_components/moment/moment'
		}
});

//REINSTATE FOR MOBILE
//document.addEventListener('deviceready', function() {
	//window.FastClick.attach(document.body);
	require(['app'], function (App) {
			App.initialize();
	});
//}, true);
