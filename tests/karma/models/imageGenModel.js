describe('ImageGenModel', function () {

    karmaHelpers.setup('model', 'ImageGenModel');

    it('should have all dependencies', function () {
        var model = create(); 
        expect(model.events).to.be.an('object');
        expect(model.$q).to.be.a('function');
        expect(model.imageGenService).to.be.a('object');
        expect(model.storage).to.be.a('object');
    });

    it('should have a loadImage method which returns saved image', function () {
        var model = create(); 
        sinon.stub(model.storage, 'get', function(){ return 'test'; });

        var res = model.loadImage();

        model.storage.get.should.have.been.calledWith('imageGen-saved');

        res.then(function(img){
            expect(img).to.be.deep.equal('test');
        });
    });

    it('loadImage should return a default image if no saved', function () {
        var model = create(); 
        sinon.stub(model.storage, 'get', function(){ return null; });

        var res = model.loadImage();

        model.storage.get.should.have.been.calledWith('imageGen-saved');

        res.then(function(img){
            //We should get some default image
            expect(img.length > 1).to.be.deep.equal(true);
        });
    });

    it('should have a loadNewImage method which returns a new image', function () {
        var model = create(); 
        sinon.stub(model.imageGenService, 'getRandomImage', function(){
            var deferred = this.$q.defer();
            deferred.resolve({image:{url:'test'}});
            return deferred.promise;
        });

        var res = model.loadNewImage();

        model.imageGenService.getRandomImage.should.have.been.calledOnce;

        res.then(function(img){
            expect(img.length > 1).to.be.deep.equal(true);
        });
    });


    it('should have a setImage method which updates the image', function () {
        var model = create(); 
        sinon.stub(model.storage, 'set', function(){ });

        var res = model.setImage('test');

        model.storage.set.should.have.been.calledWith('imageGen-saved', 'test');

        expect(model.image).to.be.equal('test');
    });

    it('should have a getImage method which gets the current image', function () {
        var model = create(); 

        model.image = 'test';
        var res = model.getImage();

        expect(res).to.be.equal('test');
    });

});
