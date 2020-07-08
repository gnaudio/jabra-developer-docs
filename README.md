# Jabra Developer Docs

Welcome to the source project for the new interactive Jabra Developer Docs [published at ...](), showing how to benefit from Jabra (Javascript) SDK's in softphone integrations etc.

Nb. This project reflects experimental, unfinished work in progess (early ALPHA version). Use at your own risk.

## About this project

This project leverages [Vuepress](https://vuepress.vuejs.org/), [Vue.js](https://vuejs.org/) and [Node.js](https://nodejs.org/en/) to build a (mostly) static Jabra documentation HTML site based (mostly) on [github flavored markdown files](https://guides.github.com/features/mastering-markdown/) extended with various [vuepress extensions](https://v1.vuepress.vuejs.org/guide/markdown.html). 

The result is a technial documentation site that is very capable yet easy to mainntain and easy to host on a webserver without a CMS or database.

In addition to the static HTML, the site is enriched with a few interactive Vue components that demostrate behavior. These components are locally defined in this project and use client side javascript and the [Jabra Browser SDK](https://github.com/gnaudio/jabra-browser-integration).

*NOTE: Please visit the [Vuepress website](https://vuepress.vuejs.org/) for a general introduction before proceeding. Also, if you are unfamiliar with git look at one of the many [tutorials](https://git-scm.com/docs/gittutorial)*

## Pre-requisites (for development)

To work on this documentation site you need to install the following (free) tools:
* [Node.js](https://nodejs.org/en/download/) v12 or later.
* [Visual Studio Code](https://code.visualstudio.com/) source editor with the **Vetur** extension for [Vue.js](https://vuejs.org/) (or any similar editor/IDE).
* [Git](https://git-scm.com/) version control system.
* Jabra Browser SDK [chrome extension](https://chrome.google.com/webstore/detail/jabra-browser-integration/okpeabepajdgiepelmhkfhkjlhhmofma) and [Chromehost](https://github.com/gnaudio/jabra-browser-integration#native-chromehost-downloads) (latest versions).

Optionally, if you want to fully test the generated build on your own PC before copying to the webserver, you can use a tool like local-web-server (or similar) to serve pages locally under https.

To install the local-web-server tool type ```npm install -g local-web-server``` which will make the ```ws``` command globally available.

After installation of above tools, you should:

1) Clone this repository on your local Windows/Mac/Linux PC with git into a new folder called ```jabra-developer-docs```.
2) CD into the new folder.
3) Install required project npm packages for the project.

For this the shell commands are as follow:
```bash
git clone https://github.com/gnaudio/jabra-developer-docs.git
cd jabra-developer-docs
npm install
```

*You may need to reinstall packages at a later time with ```npm install```, if the ```package.json``` file is updated when you pull new changes.* 

## Development view

You can see the documentation in chrome change live at "http://localhost:8080/" as you edit/add files with the following command:

```bash
npm run dev
```

Caveats:
* Some major changes may require restarting the dev command, but in most cases it works.
* Some browser sdk media features requires https to work by chrome for security reasons. These won't work in developer mode as the tool does not (currently) support https. You need to publish and test with the local-web-server tool in this case.

For more details, please head VuePress's [documentation](https://vuepress.vuejs.org/).

## Key source files

The following shows an overview of the source structure. Note the special  ```jabraMeta.js``` configuration file with key Jabra SDK metadata. This file must be updated when new releases are available. Another key configuration files is ```config.js``` which must be updated when adding new markdown files, languages etc.

```
docs
    .vuepress
        components
           Jabra (Interactive Jabra Vue components)
        dist (Where output is generated when build)
        plugins (Custom vuepress plugins)
        public (Assets)
        styles (Special styles)
        theme (Theme overrides)
        config.js (Main vuepress config file)
        enhanceApp.js (Vuepress customization file)
        jabraService.js (Used at runtime)
        steps.js (Used for testing).
    de (german markdown files)
    es (spanish markdown files)
    fr (french markdown files)
    resource (english markdown files)
    softphone (english markdown files)
    jabraMeta.js (key metadata about Jabra SDKs such as versions, urls etc.)
    README.md (english homepage)
```

## Publishing

To generate finished distribution files to put on a webserver (remember to configure it to use https):

```bash
npm run build
```

The generated output files will be put in the (hidden) ```docs/.vuepress/dist``` folder. To test the output you can do the execute (with forward slashes changed to backward slashes on windows):

```
cd docs/.vuepress/dist:
ws --https
```

You can then verify the output with chrome on address "https://127.0.0.1:8000".

Finally copy the output files to a local webserver when satisfied.

# More information

Vuepress:
* [Vuepress guide](https://v1.vuepress.vuejs.org/guide/)
* [Vuepress config reference](hhttps://v1.vuepress.vuejs.org/config/)
* [Internationalization](https://v1.vuepress.vuejs.org/guide/i18n.html)
* [Add CSS to markdown](https://www.marcomark.net/code/vuepress/markdown-classes.html)
* [Awesome vuepress links!](https://github.com/vuepressjs/awesome-vuepress)

Other:
* [Vue.js](https://vuejs.org/)
* [Github flavored markdown](https://guides.github.com/features/mastering-markdown/)
* [Front matter](https://jekyllrb.com/docs/front-matter/)
* [Git tutorial](https://git-scm.com/docs/gittutorial)

## License 
Documention and samples are open source and can be used freely (see [LICENSE](LICENSE.md) file).

## Support
Documention and samples are provided by the [Jabra Developer Zone](https://developer.jabra.com). Please vist us for support and help.