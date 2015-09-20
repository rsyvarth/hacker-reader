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
                promises = [],
                i = 0;

            this.stories = [];

            for(; i < ids.length; i++) {
                promises.push(this._getDetails(ids[i]));
            }

            this.$q.all(promises).then(function(embeds){
                console.log(embeds);

                for(i = 0; i < this.stories.length; i++) {
                    this.stories[i].embed = embeds[i];
                }

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

        this.hackerNewsService.getStoryDetails(id).then(function(data){
            var def2 = this.$q.defer();
            this.stories.push(data);
            // this.urls.push(data.url);
            def2.resolve(data);
            return def2.promise;
        }.bind(this)).then(function(data){
            return this.embedService.getEmbed(data.url);
        }.bind(this)).then(function(data){
            deferred.resolve(data);
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
