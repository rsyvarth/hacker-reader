'use strict';

/**
 * Persistent Storage Service
 *
 * Provides an interface for setting and accessing values
 * into a persistent data store. This currently is implemented
 * using localstorage but could be extended to include fallbacks
 * for browsers which don't support localstorage.
 */
var PersistentStorageService = Class.extend({
  $localstorage: null,

  /**
   * Init class
   */
  init: function($localstorage) {
    this.$localstorage = $localstorage;
  },

  /**
   * Get value from store by key
   */
  get: function(key) {
    var ret = this.$localstorage.getItem(key);
    return ret ? JSON.parse(ret).data : ret;
  },

  /**
   * Set key/value pair into store
   */
  set: function(key, val) {
    this.$localstorage.setItem(key, JSON.stringify({data: val}));
  },

  /**
   * Remove key from store
   */
  remove: function(key) {
    this.$localstorage.removeItem(key);
  },

  /**
   * Reset the store completely
   */
  reset: function() {
    this.$localstorage.clear();
  }

});

(function() {
  var persistentStorageServiceProvider = Class.extend({
    $get: function() {
      return new PersistentStorageService(localStorage);
    }
  });

  angular.module('storage.persistentStorageService',[])
    .provider('PersistentStorageService', persistentStorageServiceProvider);
}());
