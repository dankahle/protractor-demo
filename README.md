# protractor-demo

This is a duplicate of [Super Calculator](http://juliemr.github.io/protractor-demo/) (see her associated github repo), to duplicate the testing from protractor tutorial.

You did the tutorial tests, but then you did unit test. One version just using the comp, and the other version, using the html element, so much like the e2e. The html version was painful. I'd say the way to go is:  
* unit testing with comp
* e2e testing with html

you'll need both imo, and surely you can hit many more paths with comp, while maybe just a happy path with e2e.


