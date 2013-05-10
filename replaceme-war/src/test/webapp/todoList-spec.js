
describe('replaceme', function() {

    beforeEach(function() {
        browser().navigateTo('index.html');
    });


    it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
        expect(browser().location().url()).toBe('/home');
    });


    describe('page home', function() {

        beforeEach(function() {
            browser().navigateTo('#/home');
        });


        it('should write welcome message on the first page', function() {
            expect(element('h3').text()).toBe('Welcome to the HTML5/REST demo app :-)')
        });

    });

});