'use strict';
namespace('models.events').ENTRIES_LOADED = 'StoryModel.ENTRIES_LOADED';

var ReadMarkerModel = Class.extend({
  events: null,
  $q: null,
  storage: null,

  init: function(Events, $q, PersistentStorageService) {
    this.events = Events;
    this.$q = $q;
    this.storage = PersistentStorageService;
  },

  filterStoryIds: function(ids) {
    if (this.getReadFilter()) {
      return ids;
    }

    var readStories = Object.keys(this._getReadIds());
    return ids.filter(function(val) {
      return readStories.indexOf(val.toString()) === -1;
    });
  },

  isRead: function(id) {
    var readStories = Object.keys(this._getReadIds());
    return readStories.indexOf(id.toString()) !== -1;
  },

  saveId: function(id, save) {
    var ids = this._getReadIds();
    if (save) {
      ids[id] = 1;
    } else {
      delete ids[id];
    }

    this.storage.set('read-ids', ids);
  },

  getReadFilter: function() {
    return this.storage.get('read-filter');
  },

  setFilter: function(val) {
    return this.storage.set('read-filter', !!val);
  },

  _getReadIds: function() {
    var ids = this.storage.get('read-ids');
    return ids ? ids : {};
  }

});

(function() {
  var ReadMarkerModelProvider = Class.extend({
    $get: function(Events, $q, PersistentStorageService) {
      return new ReadMarkerModel(Events, $q, PersistentStorageService);
    }
  });

  angular.module('story.ReadMarkerModel',[])
    .provider('ReadMarkerModel', ReadMarkerModelProvider);
}());
