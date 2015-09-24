'use strict';
namespace('models.events').ENTRIES_LOADED = 'StoryModel.ENTRIES_LOADED';

var StoryModel = Class.extend({
  stories: [],
  events: null,
  $q: null,
  hackerNewsService: null,
  embedService: null,
  readMarkerModel: null,

  init: function(Events, $q, HackerNewsService, EmbedService, ReadMarkerModel) {
    this.events = Events;
    this.$q = $q;
    this.hackerNewsService = HackerNewsService;
    this.embedService = EmbedService;
    this.readMarkerModel = ReadMarkerModel;
  },

  loadStories: function(page) {
    var deferred = this.$q.defer();
    var limit = 20;
    page = page > 1 ? page : 1;

    this.hackerNewsService.getTopStoryIds().then(function(data) {
      data = this.readMarkerModel.filterStoryIds(data);

      var offset = (page - 1) * limit;
      var ids = data.slice(offset, offset + limit);
      var promises = [];

      this.stories = [];

      for (var i = 0; i < ids.length; i++) {
        promises.push(this._getDetails(ids[i]));
      }

      this.$q.all(promises).then(function() {
        this.events.notify(models.events.ENTRIES_LOADED);
        deferred.resolve(this.stories);
      }.bind(this));

    }.bind(this));

    return deferred.promise;
  },

  getStories: function() {
    return this.stories;
  },

  setRead: function(story, val) {
    story.read = val;
    this.readMarkerModel.saveId(story.id, val);
  },

  _getDetails: function(id) {
    var deferred = this.$q.defer();
    var story = null;

    this.hackerNewsService.getStoryDetails(id).then(function(data) {
      this.stories.push(data);
      data.read = this.readMarkerModel.isRead(data.id);
      story = data;
    }.bind(this)).then(function() {
      if (!story.url) { return; }
      return this.embedService.getEmbed(story.url);
    }.bind(this)).then(function(embed) {
      story.embed = embed;
      deferred.resolve();
    }, function() {
      deferred.resolve();
    });

    return deferred.promise;
  }

});

(function() {
  var StoryModelProvider = Class.extend({
    $get: function(Events, $q, HackerNewsService, EmbedService, ReadMarkerModel) {
      return new StoryModel(Events, $q, HackerNewsService, EmbedService, ReadMarkerModel);
    }
  });

  angular.module('story.StoryModel',[])
    .provider('StoryModel', StoryModelProvider);
}());
