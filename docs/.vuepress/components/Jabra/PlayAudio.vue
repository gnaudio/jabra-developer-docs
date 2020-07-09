<!-- This component is used for calling GetDevices -->

<template>
  <div>
    <audio id="player" muted autoplay></audio>
    <button :disabled="inProgress" v-on:click="run"> RUN </button>
    <pre><code>{{ result }}</code></pre>  
  </div>
</template>

<script>
  import jabraService from '../../jabraService';
  import Vue from 'vue'

  export default Vue.extend({
    name: "PlayAudio",
    props: {
      audioFile: String,
      audioType: String,
    },
    data() {
      return {
        result: '',
        inProgress: false
      }
    },
    mounted () {
        // Make sure jabra API is initialized to start with.
        jabraService.safeInit();
    },
    methods: {
      run: function (event) {
        const self = this;

        self.result = "...";
        self.inProgress = true;

        const player = document.getElementById("player");

        jabraService.setDeviceOutput(player).then((deviceInfo) => {
          player.srcObject = undefined;
          player.type= self.audioType;
          player.src= self.audioFile;
          player.muted = false;
          self.result = "Ringing in Jabra device:" + deviceInfo.deviceName;
        }).catch((e) => {
          self.result = e;
        }).finally(() => {
          self.inProgress = false;
        });
      },

      stop: function (event) {
        const player = document.getElementById("player");
        player.muted = true;
      }
    }
  })
</script>

