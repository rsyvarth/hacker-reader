var karmaHelpers = {
    setup: function(type, name) {
        beforeEach(module('app'));

        var $httpBackend;
        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');

            create = function(mock) {
                if(typeof name == 'function') {
                    name();
                    return obj;
                }
                if(typeof mock == 'function') {
                    mock($httpBackend);
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