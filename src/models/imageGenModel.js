'use strict';

/**
 * Define the IMAGE_LOADED event which this model emits
 */
namespace('models.events').IMAGE_LOADED = 'ImageGenModel.IMAGE_LOADED';

/**
 * Image Generator Model
 *
 * This model provides a large random background image for
 * use as the site's background image. It also uses persistent
 * storage to save the latest background image between page loads
 */
var ImageGenModel = Class.extend({
  image: null,
  events: null,
  $q: null,
  imageGenService: null,
  storage: null,

  /**
   * Init class
   */
  init: function(Events, $q, ImageGenService, PersistentStorageService) {
    this.events = Events;
    this.$q = $q;
    this.imageGenService = ImageGenService;
    this.storage = PersistentStorageService;
  },

  /**
   * Retrieves the saved image if one exists, otherwise it returns a new image
   * Fires the IMAGE_LOADED event once the image is loaded.
   */
  loadImage: function() {
    var saved = this.storage.get('imageGen-saved');
    if (!saved) {
      // I was originally going to make this load a random background if you didn't
      // have one saved in localstorage but I decided to throw in a sane default
      // so your first experience doesn't ever end up being an ugly/poorly contrasting bg
      // return this.loadNewImage();
      saved = 'http://a.desktopprassets.com/wallpapers/544b5871ff1bee38e5643fc9ab97a8cdfc16fc68/03826_rockwoodandwater_2880x1800.jpg';
    }

    var deferred = this.$q.defer();

    this.setImage(saved);

    this.events.notify(models.events.IMAGE_LOADED);
    deferred.resolve(this.image);

    return deferred.promise;
  },

  /**
   * Load a new (random) image and save it to persistent storage.
   * Fires the IMAGE_LOADED event once the image is loaded.
   */
  loadNewImage: function() {
    var deferred = this.$q.defer();

    this.imageGenService.getRandomImage().then(function(data) {
      this.setImage(data.image.url);

      this.events.notify(models.events.IMAGE_LOADED);
      deferred.resolve(this.image);
    }.bind(this));

    return deferred.promise;
  },

  /**
   * Sets the current image and persists it
   */
  setImage: function(img) {
    this.image = img;
    this.storage.set('imageGen-saved', this.image);
  },

  /**
   * Returns the current image
   */
  getImage: function() {
    return this.image;
  }

});

(function() {
  var ImageGenModelProvider = Class.extend({
    $get: function(Events, $q, ImageGenService, PersistentStorageService) {
      return new ImageGenModel(Events, $q, ImageGenService, PersistentStorageService);
    }
  });

  angular.module('imageGen.imageGenModel',[])
    .provider('ImageGenModel', ImageGenModelProvider);
}());
