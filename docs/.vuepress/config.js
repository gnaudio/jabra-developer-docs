// Load jabra metadata for use by configuration.
const jabraConfig = require('../jabraMeta.js');

// Main site configuration
module.exports = {
  /**
   * Only support chrome / latest browsers.
   */
  evergreen: true,
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Interactive SDK Getting Started Guide',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'no' }]
  ],

  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'Interactive SDK Getting Started Guide',
      description: 'Interactive SDK Getting Started Guide description'
    },
    '/de/': {
      lang: 'de',
      title: 'Interaktiver Leitfaden für die ersten Schritte',
      description: 'Interaktiver Leitfaden für die ersten Schritte beschreibung'
    }
  },

  theme: '@vuepress/vue',

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'gnaudio/jabra-developer-docs',
    editLinks: false,
    docsDir: 'docs',
    lastUpdated: false,
    sidebarDepth: 0,
    displayAllHeaders: true,

    locales: {
      '/': {
        // text for the language dropdown
        selectText: 'Languages',
        // label for this locale in the language dropdown
        label: 'English',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Languages',
        // text for the edit-on-github link
        editLinkText: 'Edit this page on GitHub',
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        // algolia docsearch options for current locale
        algolia: {},
        nav: getNav('', jabraConfig.browser.title, jabraConfig.node.title, 'Resources', jabraConfig.support.title),
        sidebar: {
          '/softphone/': getSoftphoneSideBar('Browser SDK Softphone', 'Node.js SDK Softphone'),
        }
      },
      '/de/': {
          // text for the language dropdown
          selectText: 'Sprachen',
          // label for this locale in the language dropdown
          label: 'Deutsche',
          // Aria Label for locale in the dropdown
          ariaLabel: 'Sprachen',
          // text for the edit-on-github link
          editLinkText: 'Bearbeiten Sie diese Seite auf GitHub',
          // config for Service Worker
          serviceWorker: {
            updatePopup: {
              message: "Neuer Inhalt ist verfügbar.",
              buttonText: "Aktualisierung"
            }
          },
          // algolia docsearch options for current locale
          algolia: {},
          nav: getNav('/de', jabraConfig.browser.title, jabraConfig.node.title, 'Resources', jabraConfig.support.title),
          sidebar: {
            '/de/softphone/': getSoftphoneSideBar('Browser SDK Softphone', 'Node.js SDK Softphone'),
          }
      }
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    require("./plugins/addJabraMeta"),
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom'
  ]
};

function getNav(langDir, browserTitle, nodeTitle, resourcesTitle, devZoneTitle) {
 return [
    {
      text: browserTitle,
      link: langDir+'/softphone/browser/step1',
    },
    {
      text: nodeTitle,
      link: langDir+'/softphone/node/step1',
    },
    {
      text: resourcesTitle,
      link: langDir+'/resources/'
    },
    {
      text: devZoneTitle,
      link: jabraConfig.support.site
    }
  ];
}

function getSoftphoneSideBar (browserTitle, nodeTitle) {
  return [
    {
      title: browserTitle,
      collapsable: true,
      children: [
        'browser/step1',
        'browser/step2',
        'browser/step3',
        'browser/step4',
        'browser/step5',
        'browser/step6',
        'browser/step7',
        'browser/step8'
      ]
    },
    {
      title: nodeTitle,
      collapsable: true,
      children: [
        'node/step1',
        'node/step2',
        'node/step3',
        'node/step4',
        'node/step5',
        'node/step6',
        'node/step7',
        'node/step8'
      ]
    }
  ]
};
