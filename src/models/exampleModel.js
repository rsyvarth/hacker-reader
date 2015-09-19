'use strict';
namespace('models.events').EXAMPLE_LOADED = "ExampleModel.EXAMPLE_LOADED";

var ExampleModel = Class.extend({
    data: {},
    events: null,
    $q: null,
    exampleService: null,

    init: function(Events, $q, ExampleService) {
        this.events = Events;
        this.$q = $q;
        this.exampleService = ExampleService;
    },

    load: function() {
        return this.exampleService.callApi().then(function(data){
            this.data = data;
            this.events.notify(models.events.EXAMPLE_LOADED);
        }.bind(this));
    },

    get: function() {
        return this.data;
    }

});

(function (){
    var ExampleModelProvider = Class.extend({
        $get: function(Events, $q, ExampleService){
            return new ExampleModel(Events, $q, ExampleService);
        }
    });

    angular.module('example.exampleModel',[])
        .provider('ExampleModel', ExampleModelProvider);
}());
