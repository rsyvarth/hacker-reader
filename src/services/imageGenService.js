'use strict';

/**
 * Image Generator Service
 *
 * Uses the Desktoppr api in order to pull random
 * background images
 */
var ImageGenService = Class.extend({
  $q: null,
  $http: null,
  baseUrl: 'https://api.desktoppr.co/1',

  /**
   * Class init
   */
  init: function($q, $http) {
    this.$q = $q;
    this.$http = $http;
  },

  /**
   * Pulls a random background image from Desktoppr
   */
  getRandomImage: function() {
    var deferred = this.$q.defer();

    this.$http({
      method: 'GET',
      url: this.baseUrl + '/wallpapers/random'
    }).then(function(data) {
      deferred.resolve(data.data.response);
    }, function(err) {
      console.error(err); //TODO: real error handling
      deferred.reject(err);
    });

    return deferred.promise;
  }

});

(function() {
  var imageGenServiceProvider = Class.extend({
    $get: function($q, $http) {
      return new ImageGenService($q, $http);
    }
  });

  angular.module('imageGen.imageGenService',[])
    .provider('ImageGenService', imageGenServiceProvider);
}());
