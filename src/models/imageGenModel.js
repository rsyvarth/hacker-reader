'use strict';
namespace('models.events').IMAGE_LOADED = "ImageGenModel.IMAGE_LOADED";

var ImageGenModel = Class.extend({
    image: null,
    events: null,
    $q: null,
    imageGenService: null,

    init: function(Events, $q, ImageGenService) {
        this.events = Events;
        this.$q = $q;
        this.imageGenService = ImageGenService;
    },

    loadRandom: function() {
        var deferred = this.$q.defer(); 

        this.imageGenService.getRandomImage().then(function(data){
            this.image = data.image.url;
            this.events.notify(models.events.IMAGE_LOADED);
            deferred.resolve(this.image);
        }.bind(this));

        return deferred.promise;
    },

    getImage: function() {
        return this.image;
    }

});

(function (){
    var ImageGenModelProvider = Class.extend({
        $get: function(Events, $q, ImageGenService){
            return new ImageGenModel(Events, $q, ImageGenService);
        }
    });

    angular.module('imageGen.imageGenModel',[])
        .provider('ImageGenModel', ImageGenModelProvider);
}());
