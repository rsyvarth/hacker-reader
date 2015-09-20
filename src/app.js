'use strict';

var app = angular.module('app', [
    'events',

    'storage.persistentStorageService',

    'background',
    'imageGen.imageGenModel',
    'imageGen.imageGenService',

    'storyList',
    'story.StoryModel',
    'hackerNews.hackerNewsService',
    'embed.embedService',

    'ui.router',
    'pascalprecht.translate',
    'angularMoment'
]);


app.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});

app.config(['$translateProvider', function ($translateProvider) {
  // add translation table
  $translateProvider
    .translations('en', translations) //translations is set in lang/en/lang.js
    .preferredLanguage('en')
    .useSanitizeValueStrategy('escape');
}]);

//register Material Design Light components
app.run(function ($rootScope,$timeout) {
    $rootScope.$on('$viewContentLoaded', function(){
        $timeout(function(){
            componentHandler.upgradeAllRegistered();
        });
    });
});