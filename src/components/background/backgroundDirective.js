'use strict';

var BackgroundDirective = BaseDirective.extend({
    imageGenModel: null,

    init: function($scope, Events, ImageGenModel){
        this.imageGenModel = ImageGenModel;
        
        this._super($scope, Events);
    },

    addListeners: function(){
        this._super();

        this.imageLoaded = this.imageLoaded.bind(this);
        this.events.addEventListener(models.events.IMAGE_LOADED, this.imageLoaded);
    },

    setupScope: function(){
        this.$scope.image = null;
        this.imageGenModel.loadRandom();
    },

    destroy: function() {
        this._super();
    },

    imageLoaded: function() {
        this.$scope.image = this.imageGenModel.getImage();
        this.$scope.bgStyle = {'background-image': 'url('+this.$scope.image+')'};
    }

});

angular.module('background',[])
    .directive('background', function(Events, ImageGenModel){
    return {
        restrict:'E',
        isolate:true,
        link: function($scope){
            new BackgroundDirective($scope, Events, ImageGenModel);
        },
        scope:true,
        templateUrl: "partials/background/background.html"
    };
});
