var karmaHelpers = {
    setup: function(type, name) {
        beforeEach(module('boilerplate'));

        var $httpBackend;
        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');

            create = function() {
                if(typeof name == 'function') {
                    name();
                    return obj;
                }
                return $injector.get(name);
            };
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        karmaHelpers.checkExist();
    },

    checkExist: function() {
        it('should exist', function () {
            var obj = create();
            expect(obj).to.exist;
        });
    }
};