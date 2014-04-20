'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'templates',
  'collections/recipes',
], function ($, _, Backbone, JST, Recipes) {
  var TitleBarView = Backbone.View.extend({
    el: '#startBrewContainer',
    template: JST['app/scripts/templates/startBrew.ejs'],
    detailEl: '#startBrewRecipeDetails',
    detailTemplate: JST['app/scripts/templates/startBrewRecipeSteps.ejs'],
    events: {
      'change .js-recipeDropdown': 'onRecipeDropdownChangeHandler',
      'click .js-start-brew': 'startBrewClickHandler'
    },
    initialize: function() {

    },
    render: function() {
      this.$el.html(this.template({
        recipes: Recipes.models
      }));
    },
    clearRecipeStepPanel: function() {
      var $panel = $(this.detailEl);

      $panel.hide();
      $panel.html('');
    },
    onRecipeDropdownChangeHandler: function(event) {
      var $target = $(event.target),
        value = $target.val(),
        $recipePanel = $(this.detailEl),
        recipe;

      this.clearRecipeStepPanel();

      if (!value) {
        return;
      }

      recipe = Recipes.get(value);
      $recipePanel.html(this.detailTemplate({
        steps: recipe.get('steps')
      }));
      $recipePanel.show();
    },
    startBrewClickHandler: function(event) {
      var recipeId = $('.js-recipeDropdown').val(),
        recipe = Recipes.get(recipeId);

      window.Alino.activeRecipe = recipe;

      Backbone.history.navigate('', {trigger: true, replace: true});
    }
  });

  return TitleBarView;
});
