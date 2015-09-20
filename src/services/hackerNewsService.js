'use strict';

var hackerNewsService = Class.extend({
    $q: null,
    $http: null,
    baseUrl: 'https://hacker-news.firebaseio.com/v0',

    init: function($q, $http) {
        this.$q = $q;
        this.$http = $http;
    },

    getTopStoryIds: function() {
        var deferred = this.$q.defer();

        this.$http({
            method: 'GET',
            url: this.baseUrl + '/topstories.json'
        }).then(function(data){
            deferred.resolve(data.data);
        }, function(err) {
            console.error(err); //TODO: real error handling
            deferred.reject(err);
        });

        return deferred.promise;
    },

    getStoryDetails: function(id) {
        var deferred = this.$q.defer();

        this.$http({
            method: 'GET',
            url: this.baseUrl + '/item/'+id+'.json'
        }).then(function(data){
            deferred.resolve(data.data);
        }, function(err) {
            console.error(err); //TODO: real error handling
            deferred.reject(err);
        });

        return deferred.promise;
    }

});

(function (){
    var hackerNewsServiceProvider = Class.extend({
        $get: function($q, $http){
            return new hackerNewsService($q, $http);
        }
    });

    angular.module('hackerNews.hackerNewsService',[])
        .provider('HackerNewsService', hackerNewsServiceProvider);
}());
