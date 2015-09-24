describe('PersistentStorageService', function () {

    var ob = karmaHelpers.setup('service', 'PersistentStorageService');

    var mockStorage = {
      setItem: function() {},
      removeItem: function() {},
      getItem: function(key) { return '{"data":{"key":1}}'; },
      clear: function() {}
    };

    it('should call getItem when we get', function () {
        sinon.spy(mockStorage, 'getItem');
        var service = new PersistentStorageService(mockStorage); 

        var res = service.get('test');

        mockStorage.getItem.should.have.been.calledWith('test');
        expect(res).to.deep.equal({key:1});
    });


    it('should call setItem when we set', function () {
        sinon.spy(mockStorage, 'setItem');
        var service = new PersistentStorageService(mockStorage); 

        var res = service.set('test');

        mockStorage.setItem.should.have.been.calledWith('test');
    });


    it('should call removeItem when we remove', function () {
        sinon.spy(mockStorage, 'removeItem');
        var service = new PersistentStorageService(mockStorage); 

        var res = service.remove('test');

        mockStorage.removeItem.should.have.been.calledWith('test');
    });


    it('should call clear when we reset', function () {
        sinon.spy(mockStorage, 'clear');
        var service = new PersistentStorageService(mockStorage); 

        var res = service.reset();

        mockStorage.clear.should.have.been.calledOnce;
    });

});
