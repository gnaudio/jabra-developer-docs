# Missing things for planning

Need to have:
1. Complete browser sdk softphone steps.
2. Finish resource page.
3. Testing, spell checking etc.
4. Add node.js softphone steps.
5. Host on a web server / integrate with developer zone.
6. Add link to published version in README.md
7. Add document translations for multiple languages.
8. Link to finished softphone example.

Nice to have:
* Add browser sdk version check to CheckBrowserSDKInstalled component - so we get warning if using unsupported version.

* Add browser check (for Chrome)
to CheckBrowserSDKInstalled component - so we get warning if using unsupported browser.

* Consider refactoring the Jabra components for internal reuse (use inheritance/mixin).

* Embed browser and node.js sdk API documentation.
  - For browser sdk this means some serverside rendering
    of the d.ts file into html unless the browser sdk 
    could be changed to ship this with the npm. Alternatively,
    the meta data could be used to generate our own doc.
  - For node.js sdk this means using/coping the internal
    html docs in the npm. Alternatively,
    the meta data could be used to generate our own doc.

* Unit testing of jabraService.js

* Color text of error messages in dynamic components red 
  to make it more obvious it is an error.
