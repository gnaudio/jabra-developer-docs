# 3. Choose Active Jabra Device

<Jabra-Pristine v-bind:init="false"/>

When integrating with a softphone, you need to be chose what Jabra device you are using and how to setup the browser accordingly.

# Jabra device(s) lookup/selection
Multiple Jabra devices can be attached. You can output a list of all
currently attached devices using the code below:

```js
jabra.getDevices().then((devices) => {
    console.log(JSON.stringify(devices, null, 3));
}).catch ((e) => {
    console.error(e);
});
```
<Jabra-GetDevices v-bind:includeBrowserMediaDeviceInfo="false">
</Jabra-GetDevices>

Notice that all devices has their own ```deviceID```, which is how Jabra distinguish between devices.

When multiple Jabra devices are attached, the active
device is the one that you are currently using.

You can lookup what device is active with code like this:
```js
jabra.getActiveDevice().then((device) => {
    console.log(JSON.stringify(device, null, 3));
}).catch ((e) => {
    console.error(e);
});
```
<Jabra-GetActiveDevice v-bind:includeBrowserMediaDeviceInfo="false">
</Jabra-GetActiveDevice>

You can change what device is active with code like this (replacing ```<NUMBER>``` with an id):
```js
jabra.setActiveDeviceId(<NUMBER>).then(() => {
    console.log("SUCCESS");
}).catch ((e) => {
    console.error(e);
});
```
<Jabra-SetActiveDevice successMsg="SUCCESS">
</Jabra-SetActiveDevice>

You can also listen for events fired for when a Jabra device 
is attached or removed from your PC:

```js
jabra.addEventListener("device attached", (e) => {
  console.log(JSON.stringify(e, null, 3));
});

jabra.addEventListener("device detached", (e) => {
  console.log(JSON.stringify(e, null, 3));
});
```

<Jabra-DeviceEvents v-bind:nameSpec="['device attached', 'device detached']">
</Jabra-DeviceEvents>

If you use above events to update a GUI, consider starting with a getDevices() call to setup the gui with existing devices (attached before the event handler was setup).

# Finding matching browser audio device

The browser audio API's has their own concepts of a device and use input and output id's which are different from Jabra's ```deviceID```. The browser SDK can help you with this aspect as well.

::: warning
For security reasons, Chrome requires webpages to be served under **https** for the Browser Audio API's samples here to work. 
:::

To make it easy to match a Jabra ```deviceID``` with a browser audio input/output ID, you set the optional parameter ```includeBrowserMediaDeviceInfo``` when enquireing for jabra device(s): 

```js
jabra.getDevices(true).then((devices) => {
    console.log(JSON.stringify(devices, null, 3));
}).catch ((e) => {
    console.error(e);
});
```
<Jabra-GetDevices v-bind:includeBrowserMediaDeviceInfo="true">
</Jabra-GetDevices>

```js
jabra.getActiveDevice(true).then((device) => {
    console.log(JSON.stringify(device, null, 3));
}).catch ((e) => {
    console.error(e);
});
```
<Jabra-GetActiveDevice v-bind:includeBrowserMediaDeviceInfo="true">
</Jabra-GetActiveDevice>

# Selecting browser audio output

With the Jabra SDK, you can hookup a HTML Audio element (called "player" in the example) to play sound in your current Jabra device with code similar to this:

```html
<audio id="player" muted autoplay></audio>
```

```js
const player = document.getElementById("player");
jabra.getActiveDevice(true).then((deviceInfo) => {
  return jabra.trySetDeviceOutput(player, deviceInfo).then((success) => {
    return success ? deviceInfo : Promise.reject("Unable to set output");
  });
}).then((deviceInfo) => {
  player.srcObject = undefined;
  player.type= 'audio/mpeg';
  player.src= './Ringtone.mp3';
  player.muted = false;
  console.log("Ringing in Jabra device:" + deviceInfo.deviceName);
}).catch((err) => {
  console.error(e);
});
```
<Jabra-PlayAudio audioFile="/Ringtone.mp3" audioType="audio/mpeg">
</Jabra-PlayAudio>

# Selecting browser audio input

Finally, with the Jabra SDK, you can also easily get an media input stream
for the microphone in the current Jabra device:

```js
jabra.getUserDeviceMediaExt({}).then(({stream, deviceInfo}) => {  
    if (!jabra.isDeviceSelectedForInput(stream, deviceInfo)) {
      return Pomise.reject("Unable to set input");
    }

    // Stream processing.
});
```








