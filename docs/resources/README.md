# Jabra Development Resources

## Browser SDK
The [Jabra browser SDK](https://github.com/gnaudio/jabra-browser-integration) software project from Jabra helps developers to make solutions, where basic headset call control can be used from within a browser app using JavaScript. Since it is not possible to access USB devices directly from JavaScript, this library provides a solution of getting a route from the JavaScript to the Jabra USB device. The API is a JavaScript library with a facade that hides implementation details. Basic call control is defined by off-hook/on-hook, ringer, mute/unmute and hold/resume. With these features, it is possible to implement a browser based softphone app. Combined with the WebRTC technology it is possible to create a softphone that only requires small software components installed locally on the computer, while the business logic is implemented in JavaScript.

## Node.js SDK
This [Jabra Node.js SDK](https://github.com/gnaudio/jabra-node-sdk) helps developers to make desktop solutions with javascript. It is based on N-API and is thus Application Binary Interface (ABI) stable across versions of Node.js. It is also maintained as a core part of Node.js and known to work more easily with Electron (https://electronjs.org/) across versions.

## Support
Documention and samples are provided by the [Jabra Developer Zone](https://developer.jabra.com). Please vist us for support and help.
