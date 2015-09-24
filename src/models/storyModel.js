'use strict';

/**
 * Define the ENTRIES_LOADED event which this model emits
 */
namespace('models.events').ENTRIES_LOADED = 'StoryModel.ENTRIES_LOADED';

/**
 * Story Model
 *
 * Pulls most popular stories plus scrapes each story's target
 * url in order to retrieve embed information.
 */
var StoryModel = Class.extend({
  stories: [],
  events: null,
  $q: null,
  hackerNewsService: null,
  embedService: null,
  readMarkerModel: null,

  /**
   * Init class
   */
  init: function(Events, $q, HackerNewsService, EmbedService, ReadMarkerModel) {
    this.events = Events;
    this.$q = $q;
    this.hackerNewsService = HackerNewsService;
    this.embedService = EmbedService;
    this.readMarkerModel = ReadMarkerModel;
  },

  /**
   * Load the top stories filtered by read state
   */
  loadStories: function(page) {
    var deferred = this.$q.defer();
    var limit = 20;
    page = page > 1 ? page : 1;

    this.hackerNewsService.getTopStoryIds().then(function(ids) {
      var offset = (page - 1) * limit;
      var promises = [];

      ids = this.readMarkerModel.filterStoryIds(ids);
      ids = ids.slice(offset, offset + limit);
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

  /**
   * Get the list of stories
   */
  getStories: function() {
    return this.stories;
  },

  /**
   * Set a story as read/unread
   */
  setRead: function(story, val) {
    story.read = val;
    this.readMarkerModel.saveId(story.id, val);
  },

  /**
   * Retrieve the details + embed information for a particular article
   */
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
