'use strict';

var app = angular.module('boilerplate', [
    'events',

    'example',
    'example.exampleModel',
    'example.exampleService',

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