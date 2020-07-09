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
      // Hmmm. We should cleanup the events but access to props/data not working
      // this.jabraService.removeEventListener(this.nameSpec, this.eventHandler);
    },
    methods: {
      eventHandler: function(event) {
        console.log(event);
        this.result = this.result + JSON.stringify(event, null, 3) + "\n";
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

