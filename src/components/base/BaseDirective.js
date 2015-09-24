'use strict';

var BaseDirective = Class.extend({
  $scope: null,
  events: null,

  init: function($scope, Events) {
    // These errors are just informational, they won't stop execution
    // Helps debug issues where children don't pass params to _super() though
    if (!$scope) {
      console.error('BaseDirective::init() - Missing required argument $scope');
    }
    if (!Events) {
      console.error('BaseDirective::init() - Missing required argument Events');
    }

    this.$scope = $scope;
    this.events = Events;

    this.addListeners();
    this.setupScope();
  },

  addListeners: function() {
    this.$scope.$on('$destroy', this.destroy.bind(this));
  },

  setupScope: function() {
  },

  destroy: function() {
  }

});
