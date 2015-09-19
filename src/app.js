'use strict';

var app = angular.module('app', [
    'events',

    'example',
    'example.exampleModel',
    'example.exampleService',

    'background',
    'imageGen.imageGenModel',
    'imageGen.imageGenService',

    'ui.router',
    'pascalprecht.translate'
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