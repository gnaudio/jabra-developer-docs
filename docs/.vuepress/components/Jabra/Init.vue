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
    name: "Init",
    data() {
      return {
        result: '',
        inProgress: false
      }
    },
    mounted () {
        // Make sure jabra API is uninitialized to start with
        // so first init will succed on user request.
        jabraService.safeShutdown();
    },
    methods: {
      run: function (event) {
        const self = this;

        self.result = "...";
        self.inProgress = true;
                
        // First time init is called it should succed. Afterwards it should
        // fail since it is already initialized. This should be transparent
        // and therefore the error will be reported.
        jabraService.init().then(()=> {
          self.result = "SUCCESS"; // TODO: 18n support!
        }).catch(e => {
          self.result = e;
        }).finally(() => {
          self.inProgress = false;
        });
      }
    }
  })
</script>

