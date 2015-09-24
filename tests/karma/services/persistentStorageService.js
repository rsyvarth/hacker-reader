describe('EmbedService', function () {

    var ob = karmaHelpers.setup('service', 'EmbedService');

    it('should have all dependencies', function () {
        var service = create(); 
        expect(service.$http).to.be.an('function');
        expect(service.$q).to.be.a('function');
    });

});
