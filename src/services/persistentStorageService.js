'use strict';

var persistentStorageService = Class.extend({
    $localstorage: null,

    init: function($localstorage) {
        this.$localstorage = $localstorage;
    },

    get: function(key) {
        var ret = this.$localstorage.getItem(key);
        return ret ? JSON.parse(ret).data : ret;
    },

    set: function(key, val) {
        this.$localstorage.setItem(key, JSON.stringify({data: val}));
    },

    remove: function(key) {
        this.$localstorage.removeItem(key);
    },

    reset: function() {
        this.$localstorage.clear();
    }

});

(function (){
    var persistentStorageServiceProvider = Class.extend({
        $get: function(){
            return new persistentStorageService(localStorage);
        }
    });

    angular.module('storage.persistentStorageService',[])
        .provider('PersistentStorageService', persistentStorageServiceProvider);
}());
