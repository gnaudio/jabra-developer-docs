<!-- This component is used for calling GetActiveDevice -->

<template>
  <div>
    <input v-model.number="deviceId" size="4"/>
    <button :disabled="inProgress" v-on:click="run"> RUN </button>
    <pre><code>{{ result }}</code></pre>  
  </div>
</template>

<script>
  import jabraService from '../../jabraService';
  import Vue from 'vue'

  export default Vue.extend({
    name: "SetActiveDevice",
    props: {
      successMsg: String
    },
    data() {
      return {
        deviceId: 0,
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

        jabraService.setActiveDeviceId(self.deviceId).then((device) => {
            self.result = self.successMsg;
        }).catch ((e) => {
            self.result = e;
        }).finally(() => {
           self.inProgress = false;
        });
      }
    }
  })
</script>

