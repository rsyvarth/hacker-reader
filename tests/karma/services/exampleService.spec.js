describe('ExampleService', function () {

	karmaHelpers.setup('service', 'ExampleService');

    it('should have all dependencies', function () {
        var service = create(); 
        expect(service.$timeout).to.be.an('function');
        expect(service.$q).to.be.a('function');
    });

    it('should have a callApi method which returns a promise', function () {
        var service = create();
        expect(service.callApi).to.exist;
        var res = service.callApi();
        expect(res).to.exist;
        expect(res.then).to.exist;
    });

});
