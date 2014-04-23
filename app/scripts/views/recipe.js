'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'collections/groups',
  'collections/steps',
  'views/popups/editStep',
  'libs/html.sortable',
], function ($, _, Backbone, JST, Groups, Steps, EditStepPopup) {
  var RecipeView = Backbone.View.extend({
    el: '#recipeContainer',
    template: JST['app/scripts/templates/recipe.ejs'],
    events: {
      'click .js-edit-step': 'onEditStepClickHandler'
    },
    initialize: function() {

    },
    render: function() {
      var me = this;

      //TODO - fix when I have a proper step model
      var stepMapper = function(stepId) {
        var step = Steps.get(stepId);
        return {
          id: step.get('id'),
          name: step.get('name'),
          description: step.get('description'),
          time: step.get('time'),
          targetTemp: step.get('targetTemp'),
          notification: step.get('notification'),
          sms: step.get('sms')
        };
      };

      var groupMapper = function(groupId) {
        var group = Groups.get(groupId);
        return {
            id: group.id,
            name: group.get('name'),
            order: group.get('order'),
            steps: _.map(group.get('steps'), stepMapper)
          };
      };

      this.$el.html(this.template({
        name: this.model.get('name'),
        description: this.model.get('description'),
        groups: _.map(this.model.get('groups'), groupMapper),
      }));


      $('.sortable').sortable({
        items: '.js-recipe-order',
        placeholder : '<div class="recipeStep--sortable"></div>'
      }).bind('sortupdate', function(e, ui) {
        me.saveCurrentOrder();
      });
    },
    groupDisplayInfo: function(steps) {
      var byGroups = _.groupBy(steps, function(step) {
        //Fix up when I get real step objects here
        return step.groupId;
      });
      return byGroups;
    },
    saveCurrentOrder: function() {
      console.log('saveCurrentOrder');
    },
    onEditStepClickHandler: function(event) {
      var $target = $(event.currentTarget),
        stepId = $target.parents('.recipeStep').data('id'),
        step = Steps.get(stepId),
        editPopup = new EditStepPopup(step);

      editPopup.show();

    }
  });

  return RecipeView;
});
