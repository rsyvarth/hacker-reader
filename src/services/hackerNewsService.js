'use strict';

/**
 * Hacker News Service
 *
 * Provides an interface for Hacker News' api
 * so that we can pull top stories and their
 * corresponding data
 */
var HackerNewsService = Class.extend({
  $q: null,
  $http: null,
  baseUrl: 'https://hacker-news.firebaseio.com/v0',

  /**
   * Init class
   */
  init: function($q, $http) {
    this.$q = $q;
    this.$http = $http;
  },

  /**
   * Pull a list of the top 500 most popular stories
   */
  getTopStoryIds: function() {
    var deferred = this.$q.defer();

    this.$http({
      method: 'GET',
      url: this.baseUrl + '/topstories.json'
    }).then(function(data) {
      deferred.resolve(data.data);
    }, function(err) {
      console.error(err); //TODO: real error handling
      deferred.reject(err);
    });

    return deferred.promise;
  },

  /**
   * Pull detains for a particular story by id
   */
  getStoryDetails: function(id) {
    var deferred = this.$q.defer();

    this.$http({
      method: 'GET',
      url: this.baseUrl + '/item/' + id + '.json'
    }).then(function(data) {
      deferred.resolve(data.data);
    }, function(err) {
      console.error(err); //TODO: real error handling
      deferred.reject(err);
    });

    return deferred.promise;
  }

});

(function() {
  var hackerNewsServiceProvider = Class.extend({
    $get: function($q, $http) {
      return new HackerNewsService($q, $http);
    }
  });

  angular.module('hackerNews.hackerNewsService',[])
    .provider('HackerNewsService', hackerNewsServiceProvider);
}());
