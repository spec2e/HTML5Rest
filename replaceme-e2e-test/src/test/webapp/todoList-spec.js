
describe('replaceme', function() {

    beforeEach(function() {
        browser().navigateTo('index.html');
    });


    it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
        expect(browser().location().url()).toEqual('/home');
    });


    describe('page home', function() {

        beforeEach(function() {
            browser().navigateTo('#/home');
        });


        it('should write welcome message on the first page', function() {
            expect(element('h3').text()).toBe('Welcome to the HTML5/REST demo app :-)')
        });

    });

    describe('Goto list page', function() {

        beforeEach(function() {
            browser().navigateTo('#/home');
        });


        it('should go to the list page, when the list link is clicked', function() {
            expect(element('#list-link').click());
            expect(browser().location().url()).toEqual('/todo/list');
        });

    });

});