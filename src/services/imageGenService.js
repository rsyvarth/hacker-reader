'use strict';

var imageGenService = Class.extend({
    $q: null,
    $http: null,
    baseUrl: 'https://api.desktoppr.co/1',

    init: function($q, $http) {
        this.$q = $q;
        this.$http = $http;
    },

    getRandomImage: function() {
        var deferred = this.$q.defer();

        this.$http({
            method: 'GET',
            url: this.baseUrl + '/wallpapers/random'
        }).then(function(data){
            deferred.resolve(data.data.response);
        }, function(err) {
            console.error(err); //TODO: real error handling
        });

        return deferred.promise;
    }

});

(function (){
    var imageGenServiceProvider = Class.extend({
        $get: function($q, $http){
            return new imageGenService($q, $http);
        }
    });

    angular.module('imageGen.imageGenService',[])
        .provider('ImageGenService', imageGenServiceProvider);
}());
