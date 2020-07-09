<!-- This component is used for listening to event(s) -->

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
      // Problem: We should cleanup here as outlined below but access to 
      // props/data/imports not working.
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

        this.result = "";
      }
    }
  })
</script>

