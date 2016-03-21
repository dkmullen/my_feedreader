/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('URLs are defined', function() {
			for (i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url.length).not.toBe(0);
			}
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		it('names are defined', function() {
			for (i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name.length).not.toBe(0);
			}
        });
    });


    /* TODO: Write a new test suite named "The menu" */
	describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
		it('is hidden by default', function() {
			expect(document.body.className).toBe('menu-hidden');
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		it('changes visibility on click', function() {
			//Simulate a click, check to see that 'menu-hidden' class disappears
			$('.menu-icon-link').click();				
			expect(document.body.className).toBe('');
			
			//Simulate a click, check to see that 'menu-hidden' class reappears
			$('.menu-icon-link').click()				
			expect(document.body.className).toBe('menu-hidden');
			})
	});

    /* TODO: Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
		beforeEach(function(done) {
			loadFeed(0, done);
		});
		it('should contain at least one entry', function(done) {
			//look for the class 'entry' in the DOM feed container, check to
			//see that it isn't empty (ie, of zero length)
			expect($('.entry').length).toBeGreaterThan(0);
			//console.log($('.entry').length);
			done();
		});

	});	 
    /* TODO: Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
		/* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
		var feedTitle = $('.header-title').html(); //header-title == 'Feeds', from html
		
		beforeEach(function(done) {
			/* load feed #1, CSS Tricks in this case. When this loads, header-title
			 * changes to 'CSS Tricks' and then the comparison at the bottom is run.
			 */
			loadFeed(1, done);
		});
		
		/* This simply changes the feed back to the default, 'Udacity Blog 
		 * after the test runs */
		afterEach(function(done) {
			loadFeed(0, done);
		});
		
		/* So, the test simply makes sure that header-title changes from the 
		 * default, which is set in the html, to something else, presumably
		 * from a feed */
		it('should change when new feed loads', function(done) {
			expect($('.header-title').html()).not.toBe(feedTitle);
			done();
		});
		
	});	 
}());
