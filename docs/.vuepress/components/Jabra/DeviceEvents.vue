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
    name: "DeviceEvents",
    props: {
      nameSpec: undefined,
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
    beforeDestroy() {
      // this.jabraService.removeEventListener(this.nameSpec, this.eventHandler);
      // console.log("UNSUBSCRIBING FROM EVENTS");
    },
    methods: {
      eventHandler: function(event) {
        console.log(e);
        self.result = self.result + JSON.stringify(e, null, 3) + "\n";
      },

      run: function (event) {
        this.result = "...";
        this.inProgress = true;

        jabraService.addEventListener(this.nameSpec, this.eventHandler);

        console.log("done setting up events");

        this.result = "";
      }
    }
  })
</script>

