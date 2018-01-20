# protractor-demo

This is a duplicate of [Super Calculator](http://juliemr.github.io/protractor-demo/) (see her associated github repo), to duplicate the testing from protractor tutorial.

Wrapped this page in unit and e2e tests. For the unit test, just tested using component, then tested using component's template (much harder). e2e test was much more amenable to template testing, having helper functions for finding elements and doing actions, BUT was much slower. Seems the best way is to unit test the component (sans its template), then e2e test the page. Component testing is more isolated, and maybe helper functions could ease the template testing.

