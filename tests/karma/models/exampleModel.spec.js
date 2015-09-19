describe('ExampleModel', function () {

	karmaHelpers.setup('model', 'ExampleModel');

    it('should have all dependencies', function () {
        var model = create(); 
        expect(model.events).to.be.an('object');
        expect(model.$q).to.be.a('function');
        expect(model.exampleService).to.be.an('object');
    });

    it('should have an empty data object', function () {
        var model = create();
        expect(model.data).to.be.an('object');
        expect(Object.keys(model.data).length).to.equal(0);
    });

    it('should have a load method which returns a promise', function () {
        var model = create();
        expect(model.load).to.exist;
        var res = model.load();
        expect(res).to.exist;
        expect(res.then).to.exist;
    });

    it('should have a get method which returns data', function () {
        var model = create();
        expect(model.get).to.exist;
    });

});
