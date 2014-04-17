'use strict';

define([
	'underscore'
	], function (_) {
	return {
		sounds: [
		{
			id: 1,
			reference: 'soundOne',
			name: 'Sound one',
			file: 'soundone.mp3'
		},
		{
			id: 2,
			reference: 'soundTwo',
			name: 'Sound two',
			file: 'soundtwo.mp3'
		},
		{
			id: 3,
			reference: 'soundThree',
			name: 'Sound three',
			file: '1.mp3'
		},
		{
			id: 4,
			reference: 'soundFour',
			name: 'Sound four',
			file: 'soundfour.mp3'
		},
		{
			id: 5,
			reference: 'soundFive',
			name: 'Sound five',
			file: 'soundfive.mp3'
		}
		],
		play: function(id) {
			var find = function(obj) {
					return obj.id == id;
				},
				sound = _.find(this.sounds, find),
				audioId = sound.reference,
				audioTag = document.querySelector('#' + audioId);

				console.log('Playing: ' + sound.name);
				//audioTag.play();
		}
	};
});
