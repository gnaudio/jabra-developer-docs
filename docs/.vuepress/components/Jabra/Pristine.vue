<!-- This component is used to reset Jabra SDK init state -->

<template>
</template>

<script>
  import jabraService from '../../jabraService';
  import Vue from 'vue'

  export default Vue.extend({
    name: "Pristine",
    props: {
      init: Boolean,
    },
    mounted () {
        if (this.init) {
          // Make sure a clean Jabra API instance is used
          // without "baggage" from ealier
          jabraService.safeReInit().catch((e) => {
            console.error(e);
          });
        } else {
          // Make sure any previous Jabra API instance is shutdown.
          jabraService.safeShutdown().catch((e) => {
            console.error(e);
          });
        }
    }
  })
</script>

