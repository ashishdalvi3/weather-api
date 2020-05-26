var chai = require('chai');
var assert = chai.assert;

var server = require('../weather');    /** import the Express app **/

var chaiHttp = require('chai-http');  /** require the chai-http plugin **/
chai.use(chaiHttp);                   /** use the chai-http plugin **/


var Browser = require('zombie');

// On Gomix we'll use this setting
/** ### Copy your project's url here  ### **/
//Browser.site = 'https://rebel-showy-sweatshirt.glitch.me'; 
  
// If you are testing on a local environment replace the line above  with 
Browser.localhost('example.com', (process.env.PORT || 3000));


suite('e2e Testing with Zombie.js', function() {
    const browser = new Browser();

    // Mocha allows You to prepare the ground running some code
    // before the actual tests. This can be useful for example to create
    // items in the database, which will be used in the successive tests.

    // With a headless browser, before the actual testing, we need to
    // **visit** the page we are going to inspect...
    // the suiteSetup 'hook' is executed only once at the suite startup.
    // Other different hook types can be executed before each test, after
    // each test, or at the end of a suite. See the Mocha docs for more infos.

    suiteSetup(function(done) { // Remember, web interactions are asynchronous !!
      return browser.visit('/', done);  // Browser asynchronous operations take a callback
    });


      test('#example - submit the input "city" : "Pune"', function(done) {
        browser.fill('city', 'Pune')
        browser.pressButton('submit', function(){
            // pressButton is ## Async ##.  
            // It waits for the ajax call to complete...

            // assert that status is OK 200
            browser.assert.success();
            // assert that the text inside the element 'span#name' is 'Marco'
            //browser.expect.elements('p').count.to.equal(1);
            
            done();   // It's an async test, so we have to call 'done()''
          });
      });
    
});
