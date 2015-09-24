'use strict';

/**
 * Read Marker Model
 *
 * Read markers are used to determine whether or not a
 * user has already seen a particular story and handles
 * removing previously read content from the story list
 */
var ReadMarkerModel = Class.extend({
  storage: null,

  /**
   * Class init
   */
  init: function(PersistentStorageService) {
    this.storage = PersistentStorageService;
  },

  /**
   * Filters a list of story ids down to only the ones which a
   * user should see on their story list
   *
   * @param  {Array} ids Full list of story ids
   * @return {Array}     Filtered ids
   */
  filterStoryIds: function(ids) {
    // Don't filter if the unread filter is disabled
    if (this.getReadFilterDisabled()) {
      return ids;
    }

    var readStories = Object.keys(this._getReadIds());
    return ids.filter(function(val) {
      return readStories.indexOf(val.toString()) === -1;
    });
  },

  /**
   * Determine whether a particular story id is marked as read
   *
   * @param  {int}     id Id for the story
   * @return {Boolean}    Whether that story is read
   */
  isRead: function(id) {
    var readStories = Object.keys(this._getReadIds());
    return readStories.indexOf(id.toString()) !== -1;
  },

  /**
   * Save read status for a particular story
   *
   * @param  {int}    id   Id for the story
   * @param  {Bool}   save Read status
   */
  saveId: function(id, save) {
    var ids = this._getReadIds();
    if (save) {
      ids[id] = 1;
    } else {
      delete ids[id];
    }

    this.storage.set('read-ids', ids);
  },

  /**
   * Return whether the read filter is disabled
   */
  getReadFilterDisabled: function() {
    return this.storage.get('read-filter-disabled');
  },

  /**
   * Set the read filter
   */
  setFilter: function(val) {
    return this.storage.set('read-filter-disabled', !!val);
  },

  /**
   * Get the list of IDs which have been marked as read
   */
  _getReadIds: function() {
    var ids = this.storage.get('read-ids');
    return ids ? ids : {};
  }

});

(function() {
  var ReadMarkerModelProvider = Class.extend({
    $get: function(PersistentStorageService) {
      return new ReadMarkerModel(PersistentStorageService);
    }
  });

  angular.module('story.ReadMarkerModel',[])
    .provider('ReadMarkerModel', ReadMarkerModelProvider);
}());
