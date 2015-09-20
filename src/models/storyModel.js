'use strict';
namespace('models.events').ENTRIES_LOADED = "StoryModel.ENTRIES_LOADED";

var StoryModel = Class.extend({
    stories: [],
    events: null,
    $q: null,
    hackerNewsService: null,
    embedService: null,

    init: function(Events, $q, HackerNewsService, EmbedService) {
        this.events = Events;
        this.$q = $q;
        this.hackerNewsService = HackerNewsService;
        this.embedService = EmbedService;
    },

    loadRandom: function(page) {
        var deferred = this.$q.defer();
        var limit = 20;
        page = page > 0 ? page : 0; 

        this.hackerNewsService.getTopStoryIds().then(function(data){
            var ids = data.slice(page,page+limit),
                promises = [];

            this.stories = [];

            for(var i = 0; i < ids.length; i++) {
                promises.push(this._getDetails(ids[i]));
            }

            this.$q.all(promises).then(function(){
                this.events.notify(models.events.ENTRIES_LOADED);
                deferred.resolve(this.stories);
            }.bind(this));
        }.bind(this));

        return deferred.promise;
    },

    getStories: function() {
        return this.stories;
    },

    _getDetails: function(id) {
        var deferred = this.$q.defer();
        var story = null;

        this.hackerNewsService.getStoryDetails(id).then(function(data){
            this.stories.push(data);
            story = data;
        }.bind(this)).then(function(){
            return this.embedService.getEmbed(story.url);
        }.bind(this)).then(function(embed){
            story.embed = embed;
            deferred.resolve();
        }, function(){
            deferred.resolve();
        });

        return deferred.promise;
    }

});

(function (){
    var StoryModelProvider = Class.extend({
        $get: function(Events, $q, HackerNewsService, EmbedService){
            return new StoryModel(Events, $q, HackerNewsService, EmbedService);
        }
    });

    angular.module('story.StoryModel',[])
        .provider('StoryModel', StoryModelProvider);
}());
