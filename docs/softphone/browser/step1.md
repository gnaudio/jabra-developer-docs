# 1. Install Jabra Browser SDK

## Install browser SDK runtime
The Jabra Browser SDK runtime must be installed on your PC to enable web pages (and this interactive demo) to control Jabra devices. The runtime consist of:

* A native chromehost executable that communicates natively with Jabra USB devices.
* A chrome browser extension that facilitates communication between JS and chromehost.

<ClientOnly>
<Jabra-CheckBrowserSDKInstalled>
::: slot success
::: tip Installation found.
A working browser sdk installation has been found. You can proceed and benefit from the interactive parts of this documentation.
:::
::: slot failure
::: danger Browser SDK not installed/enabled. Please install before proceeding.
You are strongly adviced to install the Browser SDK extension and chromehost now to get the most benefit of this interactive documentation!

1. Please click <a v-bind:href="$page.jabra.browser.browserExtension.chrome.link">here</a> to install latest
<a v-bind:href="$page.jabra.browser.browserExtension.chrome.link">chrome browser extension v{{$page.jabra.browser.browserExtension.chrome.version}}</a>.
2. Then download and run the latest chromehost executable installer <a v-bind:href="$page.jabra.browser.chromehost.windows.link">v{{$page.jabra.browser.chromehost.windows.version}} for Windows</a> or <a v-bind:href="$page.jabra.browser.chromehost.mac.link">v{{$page.jabra.browser.chromehost.mac.version}} for Mac</a> before you proceed.
3. [Reload]() this browser page.
:::
::: slot checking
::: warning Please wait ...
Checking if browser sdk is installed...
:::
</Jabra-CheckBrowserSDKInstalled>
</ClientOnly>

For complete download information, including other versions/platforms and JS API, please refer to the 
<a v-bind:href="$page.jabra.browser.site">github site README</a> for the Jabra Browser SDK.

## Install browser SDK client API library in your own application.

The final part of the browser SDK is a a Javascript client library {{$page.jabra.browser.api.package}} that provides a JS client API (with typescript support) for controlling Jabra devices from a browser.

You download the API library with one of the following methods:

* Manually download <a v-bind:href="$page.jabra.browser.api.jsLink">{{$page.jabra.browser.api.jsFilename}}</a>. If you are using typescript, you should also download the typescript declaration file <a v-bind:href="$page.jabra.browser.api.tsLink">{{$page.jabra.browser.api.tsFilename}}</a>.

* Install npm module in your npm based project with the command ```npm install -D {{$page.jabra.browser.api.package}}```.

::: tip
You do not need to download the JS API yet to benefit from this documentation. You do however need it when you start developing your own integration.
:::











