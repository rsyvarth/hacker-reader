describe('ReadMarkerModel', function () {

	karmaHelpers.setup('model', 'ReadMarkerModel');

    it('should have all dependencies', function () {
        var model = create(); 
        expect(model.storage).to.be.an('object');
    });

    it('should have a filterStoryIds method which is doesn\'t filter when read filter disabled', function () {
        var model = create(); 
        sinon.stub(model, 'getReadFilterDisabled', function(){ return true });
        sinon.stub(model, '_getReadIds', function(){ return {"1":1, "2": 1} });

        var res = model.filterStoryIds([1,2,3]);

        expect(res).to.be.deep.equal([1,2,3]);
    });


    it('should have a filterStoryIds method which is filters ids', function () {
        var model = create(); 
        sinon.stub(model, 'getReadFilterDisabled', function(){ return false });
        sinon.stub(model, '_getReadIds', function(){ return {"1":1, "2": 1} });

        var res = model.filterStoryIds([1,2,3]);

        expect(res).to.be.deep.equal([3]);
    });


    it('should have a isRead method which returns a boolean', function () {
        var model = create(); 
        sinon.stub(model, '_getReadIds', function(){ return {"1":1, "2": 1} });

        var res = model.isRead(1);
        expect(res).to.be.equal(true);

        res = model.isRead(3);
        expect(res).to.be.equal(false);
    });


    it('should have a saveId method which returns a boolean', function () {
        var model = create(); 
        sinon.stub(model.storage, 'get', function(){ return {"1": 1}; });
        sinon.stub(model.storage, 'set', function(){ });

        model.saveId(2, true);

        model.storage.get.should.be.calledWith('read-ids');
        model.storage.set.should.be.calledOnce;
        expect(model.storage.set.args[0][1]).to.be.deep.equal({"1": 1, "2": 1});
        
    });

    it('should have a getReadFilterDisabled method which returns a boolean', function () {
        var model = create(); 
        sinon.stub(model.storage, 'get', function(){ return true; });

        var res = model.getReadFilterDisabled(2, true);

        model.storage.get.should.be.calledWith('read-filter-disabled');
        expect(res).to.be.equal(true);        
    });

    it('should have a setFilter method which sets the filter', function () {
        var model = create(); 
        sinon.stub(model.storage, 'set', function(){ });

        model.setFilter(true);

        model.storage.set.should.be.calledWith('read-filter-disabled', true);        
    });  

    it('should have a _getReadIds method which returns an object of ids', function () {
        var model = create(); 
        sinon.stub(model.storage, 'get', function(){ return {"1": 1}; });

        var res = model._getReadIds();

        model.storage.get.should.be.calledWith('read-ids');
        expect(res).to.be.deep.equal({"1": 1});
    });

    it('_getReadIds should return {} when data store is null', function () {
        var model = create(); 
        sinon.stub(model.storage, 'get', function(){ return null; });

        var res = model._getReadIds();

        model.storage.get.should.be.calledWith('read-ids');
        expect(res).to.be.deep.equal({});
    });  

});
