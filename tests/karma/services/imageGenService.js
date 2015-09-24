describe('ImageGenService', function () {

    var ob = karmaHelpers.setup('service', 'ImageGenService');

    it('should have all dependencies', function () {
        var service = create(); 
        expect(service.$http).to.be.an('function');
        expect(service.$q).to.be.a('function');
    });

    it('should have a getRandomImage method which returns a promise', function () {
        var back;
        var data = {data: ['1','2']};
        var service = create(function($httpBackend){
            $httpBackend.when('GET', /.+\/wallpapers\/random/)
                .respond(data);

            $httpBackend.expectGET(/.+\/wallpapers\/random/);
            back = $httpBackend;
        });

        expect(service.getRandomImage).to.exist;

        var res = service.getRandomImage();
        expect(res).to.exist;
        expect(res.then).to.exist;

        back.flush();

        res.then(function(data){
            expect(data).to.equal(data);
        });
    });

});
