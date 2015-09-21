'use strict';

var HomeController = Class.extend({
  $scope: null,
  events: null,
  storyModel: null,
  $stateParams: null,

  init: function($scope, Events, StoryModel, $stateParams) {
    this.$scope = $scope;
    this.events = Events;
    this.storyModel = StoryModel;
    this.$stateParams = $stateParams;

    this.setupScope();
  },

  setupScope: function() {
    // Cast the page number to an integer, save on scope for pagination
    this.$scope.currPage = +this.$stateParams.page;
    console.log(this.$stateParams);
    this.storyModel.loadStories(this.$scope.currPage);
  }

});

HomeController.$inject = ['$scope', 'Events', 'StoryModel', '$stateParams'];
