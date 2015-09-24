'use strict';

/**
 * Home Controller
 *
 * Manages the home page and controls loading data for the
 * the story list directive.
 */
var HomeController = Class.extend({
  $scope: null,
  events: null,
  storyModel: null,
  $stateParams: null,
  readMarkerModel: null,

  /**
   * Init class
   */
  init: function($scope, Events, StoryModel, $stateParams, ReadMarkerModel) {
    this.$scope = $scope;
    this.events = Events;
    this.storyModel = StoryModel;
    this.$stateParams = $stateParams;
    this.readMarkerModel = ReadMarkerModel;

    this.setupScope();
  },

  /**
   * Sets up values on the scope then call the story model to load
   * a list of stories for the current page. (The StoryList directive
   * listens for changes to the story model and will automatically update
   * when the changes are loaded)
   */
  setupScope: function() {
    // Cast the page number to an integer (params are strings by default)
    this.$scope.currPage = Number(this.$stateParams.page);
    this.$scope.showRead = this.readMarkerModel.getReadFilterDisabled();

    this.$scope.toggleFilter = this.toggleFilter.bind(this);

    this.storyModel.loadStories(this.$scope.currPage);
  },

  /**
   * Toggle the read story filter then load a new set of stories
   * (which will now be appropriately filtered)
   */
  toggleFilter: function() {
    this.readMarkerModel.setFilter(this.$scope.showRead);
    this.storyModel.loadStories(this.$scope.currPage);
  }

});

HomeController.$inject = ['$scope', 'Events', 'StoryModel', '$stateParams', 'ReadMarkerModel'];
