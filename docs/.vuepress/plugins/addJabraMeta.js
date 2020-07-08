const jabraConfig = require('../../jabraMeta.js');

module.exports = (options = {}, context) => ({
  extendPageData ($page) {
    // Add jabra meta data to page object!
    $page.jabra = jabraConfig
  }
});
