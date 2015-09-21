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
  },

  destroy: function() {
    this._super();
  },

  storiesLoaded: function() {
    this.$scope.loading = false;
    this.$scope.stories = this.storyModel.getStories();
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
