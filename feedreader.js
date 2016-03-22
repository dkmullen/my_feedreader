/* feedreader.js

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* A suite that checks the RSS feeds definitions (the allFeeds variable) */
    describe('RSS Feeds', function() {

		it('are defined', function() {
			/* toBeDefined is a jasmine matcher that compares the tested object
			 * to a void */
            expect(allFeeds).toBeDefined();
			//toBe is a jasmine matcher that performs a triple = comparison
            expect(allFeeds.length).not.toBe(0);
        });

		/* Loop thru the feeds, check that each is defined and not empty */
		it('URLs are defined', function() {
			for (i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url.length).not.toBe(0);
			}
        });

        /* Loop through each feed, ensure it has a name defined and that 
		 * the name is not empty.
         */
		it('names are defined', function() {
			for (i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name.length).not.toBe(0);
			}
        });
    });


    /* A suite dealing with the menu */
	describe('The menu', function() {

		/* Check that the menu-hidden class is operative on page load - ie, that
		 * the menu is hidden by default */
		it('is hidden by default', function() {
			/* toContain is a Jasmine matcher that allows the body elem to
			 * contain other classes as long as 'menu-hidden is included
			 * (or NOT included, when negated by 'not', below) */
			expect(document.body.className).toContain('menu-hidden');
        });

        /* Check that the menu changes visibility when the menu icon is clicked. 
		 * Ie, that the menu displays when clicked, hides when clicked again. */
		it('changes visibility on click', function() {
			//Simulate a click, check to see that 'menu-hidden' class disappears
			$('.menu-icon-link').click();				
			expect(document.body.className).not.toContain('menu-hidden');
			
			//Simulate a click, check to see that 'menu-hidden' class reappears
			$('.menu-icon-link').click();			
			expect(document.body.className).toContain('menu-hidden');
			});
	});

    /* A suite dealing with the initial entries of a feed */
	describe('Initial Entries', function() {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
		 
		 //Before the test begins, load feed (Udacity Blog, in this case), then
		 //run the test, which calls back to this function when done
		beforeEach(function(done) {
			loadFeed(0, done);
		});
		it('should contain at least one entry', function() {
			//look for the class 'entry' in the DOM feed container, check to
			//see that it isn't empty (ie, of zero length)
			expect($('.entry').length).toBeGreaterThan(0);
		});

	});	 
	
    /* A suite that checks for changes when a new feed is selected */
	describe('New Feed Selection', function () {
		var feedContent;

		/* Call the Udacity blog feed, set feedContent to the contents of
		 * the main feed container (ie, the RSS results) */
		beforeEach(function(done) {
			loadFeed(0, function() {
				/* Waits till after load to set this variable so we don't 
				 * retrieve data from previous test suite. */
				feedContent = $('.feed').html();
				done();
			});
		});
		
		/* This simply changes the feed back to the default, 'Udacity Blog' 
		 * after the test runs. afterAll runs last in this suite, even with 
		 * multiple 'it' specs */
		afterAll(function(done) {
			loadFeed(0, done);
		});

		it('content should change when a new feed is loaded', function(done) {
			/* Loads a new feed, compares it to the previous one. Note that
			* changing this feed to match previous one causes the test to
			* fail, as expected. */
			loadFeed(1, function() {
				expect($('.feed').html() !== feedContent).toBeTruthy();
				done();
			});
		});
	});
}());