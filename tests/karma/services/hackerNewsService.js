describe('HackerNewsService', function () {

    var ob = karmaHelpers.setup('service', 'HackerNewsService');

    it('should have all dependencies', function () {
        var service = create(); 
        expect(service.$http).to.be.an('function');
        expect(service.$q).to.be.a('function');
    });

    it('should have a getTopStoryIds method which returns a promise', function () {
        var back;
        var data = {data: ['1','2']};
        var service = create(function($httpBackend){
            $httpBackend.when('GET', /.+topstories\.json/)
                .respond(data);

            $httpBackend.expectGET(/.+topstories\.json/);
            back = $httpBackend;
        });

        expect(service.getTopStoryIds).to.exist;

        var res = service.getTopStoryIds();
        expect(res).to.exist;
        expect(res.then).to.exist;

        back.flush();

        res.then(function(data){
            expect(data).to.equal(data);
        });
    });

    it('should have a getStoryDetails method which returns a promise', function () {
        var back;
        var data = {data: ['1','2']};
        var service = create(function($httpBackend){
            $httpBackend.when('GET', /.+\/item\/1\.json/)
                .respond(data);

            $httpBackend.expectGET(/.+\/item\/1\.json/);
            back = $httpBackend;
        });

        expect(service.getStoryDetails).to.exist;

        var res = service.getStoryDetails(1);
        expect(res).to.exist;
        expect(res.then).to.exist;

        back.flush();

        res.then(function(data){
            expect(data).to.equal(data);
        });
    });

});
