'use strict';

define([
  'jquery',
  'underscore',
  'templates'
  ], function ($, _, JST) {
  var popup = function(model){
    this.model = model;
    this.template =  JST['app/scripts/templates/editStepPopup.ejs'];
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
    $('.js-popupCancel').on('click', this.destroy.bind(this));
  };

  var removeEvents = function() {
    $('.js-popupOk').off('click', this.okHandler.bind(this));
    $('.js-popupCancel').off('click', this.destroy.bind(this));
  };

  var populateModel = function() {
    var properties = ['name', 'description', 'targetTemp', 'time'],
      checks = ['notification', 'sms'],
      popup = $(this.currentPopup),
      saveObj = {};

    _.each(properties, function(prop) {
      saveObj[prop] = popup.find('[data-property="' + prop + '"]').val();
    });

    _.each(checks, function(prop) {
      saveObj[prop] = popup.find('[data-property="' + prop + '"]').is(':checked');
    });

    this.model.set(saveObj);
  };

  popup.prototype.show = function(){
    var showCompleteHander = bindEvents.bind(this),
      template = $(this.template({
        name: this.model.get('name'),
        description: this.model.get('description'),
        targetTemp: this.model.get('targetTemp'),
        time: this.model.get('time'),
        notification: this.model.get('notification'),
        sms: this.model.get('sms')
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

  popup.prototype.okHandler = function() {
    populateModel.call(this);
    this.destroy();
  };

  return popup;
});
