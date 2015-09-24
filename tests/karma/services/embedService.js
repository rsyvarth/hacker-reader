describe('EmbedService', function () {

	var ob = karmaHelpers.setup('service', 'EmbedService');

    it('should have all dependencies', function () {
        var service = create(); 
        expect(service.$http).to.be.an('function');
        expect(service.$q).to.be.a('function');
    });

    it('should have a getEmbed method which returns a promise', function () {
        var back;
        var data = {data: ['1','2']};
        var service = create(function($httpBackend){
            $httpBackend.when('GET', /.+url=test/)
                .respond(data);

            $httpBackend.expectGET(/.+url=test/);
            back = $httpBackend;
        });

        expect(service.getEmbed).to.exist;

        var res = service.getEmbed('test');
        expect(res).to.exist;
        expect(res.then).to.exist;

        back.flush();

        res.then(function(data){
            expect(data).to.equal(data);
        });
    });

});
