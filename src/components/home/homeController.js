'use strict';

var HomeController = Class.extend({
  $scope: null,
  events: null,
  storyModel: null,
  $stateParams: null,
  readMarkerModel: null,

  init: function($scope, Events, StoryModel, $stateParams, ReadMarkerModel) {
    this.$scope = $scope;
    this.events = Events;
    this.storyModel = StoryModel;
    this.$stateParams = $stateParams;
    this.readMarkerModel = ReadMarkerModel;

    this.setupScope();
  },

  setupScope: function() {
    // Cast the page number to an integer, save on scope for pagination
    this.$scope.currPage = +this.$stateParams.page;
    this.$scope.showRead = this.readMarkerModel.getReadFilter();
    this.$scope.toggleFilter = this.toggleFilter.bind(this);

    this.storyModel.loadStories(this.$scope.currPage);
  },

  toggleFilter: function() {
    this.readMarkerModel.setFilter(this.$scope.showRead);
    this.storyModel.loadStories(this.$scope.currPage);
  }

});

HomeController.$inject = ['$scope', 'Events', 'StoryModel', '$stateParams', 'ReadMarkerModel'];
