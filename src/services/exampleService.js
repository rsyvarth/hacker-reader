'use strict';

var ExampleService = Class.extend({
    $q: null,
    $timeout: null,

    init: function($q, $timeout) {
        this.$q = $q;
        this.$timeout = $timeout;
    },

    callApi: function() {
        var deferred = this.$q.defer();

        this.$timeout(function(){
            deferred.resolve({text: "Test!"});
        }, 500);

        return deferred.promise;
    }

});

(function (){
    var ExampleServiceProvider = Class.extend({
        $get: function($q, $timeout){
            return new ExampleService($q, $timeout);
        }
    });

    angular.module('example.exampleService',[])
        .provider('ExampleService', ExampleServiceProvider);
}());
