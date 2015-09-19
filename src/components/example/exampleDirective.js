'use strict';

var ExampleDirective = BaseDirective.extend({
    exampleModel: null,

    init: function($scope, Events, ExampleModel){
        this.exampleModel = ExampleModel;
        
        this._super($scope, Events);
    },

    addListeners: function(){
        this._super();

        this.updateText = this.updateText.bind(this);
        this.events.addEventListener(models.events.EXAMPLE_LOADED, this.updateText);
    },

    setupScope: function(){
        this.$scope.text = "Loading...";
        this.exampleModel.load();
    },

    destroy: function() {
        this._super();
    },

    updateText: function() {
        var data = this.exampleModel.get();
        this.$scope.text = data.text;
    }

});

angular.module('example',[])
    .directive('example', function(Events, ExampleModel){
    return {
        restrict:'E',
        isolate:true,
        link: function($scope){
            new ExampleDirective($scope, Events, ExampleModel);
        },
        scope:true,
        templateUrl: "partials/example/example.html"
    };
});
