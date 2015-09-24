'use strict';

var StoryListDirective = BaseDirective.extend({
  storyModel: null,

  init: function($scope, Events, StoryModel) {
    this.storyModel = StoryModel;

    this._super($scope, Events);
  },

  addListeners: function() {
    this._super();

    this.storiesLoaded = this.storiesLoaded.bind(this);
    this.events.addEventListener(models.events.ENTRIES_LOADED, this.storiesLoaded);
  },

  setupScope: function() {
    this.$scope.stories = [];
    this.$scope.loading = true;

    this.$scope.toggleRead = this.toggleRead.bind(this);
    this.$scope.setRead = this.setRead.bind(this);
  },

  destroy: function() {
    this._super();
  },

  storiesLoaded: function() {
    this.$scope.loading = false;

    this.$scope.stories = [];
    this.$scope.stories = this.storyModel.getStories();
  },

  toggleRead: function($event, story) {
    this.storyModel.setRead(story, !story.read);

    $event.preventDefault();
    $event.stopPropagation();
  },

  setRead: function(story) {
    this.storyModel.setRead(story, true);
  }

});

angular.module('storyList',[])
  .directive('storyList', function(Events, StoryModel) {
  return {
    restrict: 'E',
    isolate: true,
    link: function($scope) {
      new StoryListDirective($scope, Events, StoryModel);
    },
    scope: true,
    templateUrl: 'partials/storyList/storyList.html'
  };
});
