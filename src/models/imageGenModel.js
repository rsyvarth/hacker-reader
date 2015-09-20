'use strict';
namespace('models.events').IMAGE_LOADED = "ImageGenModel.IMAGE_LOADED";

var ImageGenModel = Class.extend({
    image: null,
    events: null,
    $q: null,
    imageGenService: null,
    storage: null,

    init: function(Events, $q, ImageGenService, PersistentStorageService) {
        this.events = Events;
        this.$q = $q;
        this.imageGenService = ImageGenService;
        this.storage = PersistentStorageService;
    },

    loadImage: function() {
        var saved = this.storage.get('imageGen-saved');
        if(!saved) {
            return this.loadNewImage();
        }

        var deferred = this.$q.defer();

        this.image = saved;
        this.events.notify(models.events.IMAGE_LOADED);
        deferred.resolve(this.image);

        return deferred.promise;
    },

    loadNewImage: function() {
        var deferred = this.$q.defer();

        this.imageGenService.getRandomImage().then(function(data){
            this.image = data.image.url;
            this.storage.set('imageGen-saved', this.image);
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
        $get: function(Events, $q, ImageGenService, PersistentStorageService){
            return new ImageGenModel(Events, $q, ImageGenService, PersistentStorageService);
        }
    });

    angular.module('imageGen.imageGenModel',[])
        .provider('ImageGenModel', ImageGenModelProvider);
}());
