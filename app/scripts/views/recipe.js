'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'libs/html.sortable',
], function ($, _, Backbone, JST, Recipes, Popup) {
  var RecipeView = Backbone.View.extend({
    el: '#recipeContainer',
    template: JST['app/scripts/templates/recipe.ejs'],
    events: {

    },
    initialize: function() {

    },
    render: function() {
      var me = this;

      this.$el.html(this.template({
        name: this.model.get('name'),
        description: this.model.get('description'),
        steps: this.model.get('steps')
      }));

      $('.sortable').sortable({
        items: '.recipeStep',
        placeholder : '<div class="recipeStep--sortable"></div>'
      }).bind('sortupdate', function(e, ui) {
        me.saveCurrentOrder();
      });
    },
    saveCurrentOrder: function() {
      console.log('saveCurrentOrder');
    }
  });

  return RecipeView;
});
