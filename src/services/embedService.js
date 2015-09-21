'use strict';

var EmbedService = Class.extend({
  $q: null,
  $http: null,
  baseUrl: 'http://api.embed.ly/1/oembed?key=' + config.embedlyApi + '&url=',

  init: function($q, $http) {
    this.$q = $q;
    this.$http = $http;
  },

  getEmbed: function(url) {
    var deferred = this.$q.defer();

    this.$http({
      method: 'GET',
      url: this.baseUrl + url
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
  var embedServiceProvider = Class.extend({
    $get: function($q, $http) {
      return new EmbedService($q, $http);
    }
  });

  angular.module('embed.embedService',[])
    .provider('EmbedService', embedServiceProvider);
}());
