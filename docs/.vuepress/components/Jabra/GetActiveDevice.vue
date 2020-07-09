<template>
  <div>
    <button :disabled="inProgress" v-on:click="run"> RUN </button>
    <pre><code>{{ result }}</code></pre>  
  </div>
</template>

<script>
  import jabraService from '../../jabraService';
  import Vue from 'vue'

  export default Vue.extend({
    name: "GetActiveDevice",
    props: {
      includeBrowserMediaDeviceInfo: Boolean,
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

        jabraService.getActiveDevice(self.includeBrowserMediaDeviceInfo).then((device) => {
            self.result = JSON.stringify(device, null, 3);
        }).catch ((e) => {
            self.result = e;
        }).finally(() => {
           self.inProgress = false;
        });
      }
    }
  })
</script>

