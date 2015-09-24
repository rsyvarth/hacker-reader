describe('StoryModel', function () {

	karmaHelpers.setup('model', 'StoryModel');

    it('should have all dependencies', function () {
        var model = create(); 
        expect(model.events).to.be.an('object');
        expect(model.$q).to.be.a('function');
        expect(model.hackerNewsService).to.be.a('object');
        expect(model.embedService).to.be.a('object');
        expect(model.readMarkerModel).to.be.a('object');
    });

    it('should have a loadStories method which returns a promise', function () {
        var model = create(); 
        sinon.stub(model.hackerNewsService, 'getTopStoryIds', function(){ 
            var deferred = this.$q.defer();
            deferred.resolve([1,2]);
            return deferred.promise;
        });
        sinon.stub(model, '_getDetails', function(id){ model.stories.push(id); });

        var res = model.loadStories();

        model.hackerNewsService.getTopStoryIds.should.have.been.calledOnce;

        res.then(function(){
            expect(model.stories).to.be.deep.equal([1,2]);
        });
    });


    it('should have a getStories method which returns a stories', function () {
        var model = create(); 
        model.stories = [1,2];

        var res = model.getStories();

        expect(res).to.be.deep.equal([1,2]);
    });


    it('should have a loadStories method which returns a promise', function () {
        var model = create(); 
        sinon.stub(model.readMarkerModel, 'saveId', function(){});
        var story = {id: 2};
        var res = model.setRead(story, true);

        expect(story.read).to.equal(true);
        model.readMarkerModel.saveId.should.have.been.calledWith(2, true);
    });


    it('should have a _getDetails method which returns a promise', function () {
        var model = create(); 
        sinon.stub(model.hackerNewsService, 'getStoryDetails', function(id){ 
            var deferred = this.$q.defer();
            deferred.resolve({id: id, url: 'test'});
            return deferred.promise;
        });
        sinon.stub(model.embedService, 'getEmbed', function(url){ 
            var deferred = this.$q.defer();
            deferred.resolve({key: url});
            return deferred.promise;
        });
        sinon.stub(model.readMarkerModel, 'isRead', function(id){ return false; });

        var res = model._getDetails(1);


        res.then(function(){
            model.hackerNewsService.getStoryDetails.should.have.been.calledWith(1);
            model.embedService.getEmbed.should.have.been.calledWith('test');
            model.readMarkerModel.isRead.should.have.been.calledWith(1);
            expect(model.stories).to.be.deep.equal([{id: 1, url: 'test', read: false, embed: {key: 'test'}}]);
        });
    });

});
