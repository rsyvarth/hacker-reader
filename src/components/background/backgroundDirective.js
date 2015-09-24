'use strict';

/**
 * Background Directive
 *
 * Simple directive used for controlling the dynamic background on the site
 * It loads an image from a the ImageGenModel and sets it as the background.
 * It also exposes a method that allows for a new background image to be loaded.
 */
var BackgroundDirective = BaseDirective.extend({
  imageGenModel: null,

  /**
   * Init Class
   */
  init: function($scope, Events, ImageGenModel) {
    this.imageGenModel = ImageGenModel;

    this._super($scope, Events);
  },

  /**
   * Binds event listener on the IMAGE_LOADED event so that we can handle
   * every time that the model loads a new image.
   */
  addListeners: function() {
    this._super();

    this.imageLoaded = this.imageLoaded.bind(this);
    this.events.addEventListener(models.events.IMAGE_LOADED, this.imageLoaded);
  },

  /**
   * Setup values on the scope and request a new image from ImageGenModel
   */
  setupScope: function() {
    this.$scope.image = null;

    this.$scope.refreshBackground = this.refreshBackground.bind(this);

    this.imageGenModel.loadImage();
  },

  /**
   * Class destroy handler, removes event listener on IMAGE_LOADED event
   */
  destroy: function() {
    this._super();

    this.events.removeEventListener(models.events.IMAGE_LOADED, this.imageLoaded);
  },

  /**
   * Event handler for the IMAGE_LOADED event. Sets the new background up
   * on our scope
   */
  imageLoaded: function() {
    this.$scope.image = this.imageGenModel.getImage();
    this.$scope.bgStyle = {'background-image': 'url(' + this.$scope.image + ')'};
  },

  /**
   * Requests a new background image from the ImageGenModel
   */
  refreshBackground: function() {
    this.imageGenModel.loadNewImage();
  }

});

angular.module('background',[])
  .directive('background', function(Events, ImageGenModel) {
  return {
    restrict: 'E',
    isolate: true,
    link: function($scope) {
      new BackgroundDirective($scope, Events, ImageGenModel);
    },
    scope: true,
    templateUrl: 'partials/background/background.html'
  };
});
