<!-- This component is used for Jabra SDK install check -->

<template>
  <div>
    <slot v-if="!checking && installed" name="success"></slot>   
    <slot v-if="!checking && !installed" name="failure"></slot>
    <slot v-if="checking" name="checking"></slot>   
  </div>
</template>

<script>
  import jabraService from '../../jabraService';
  import Vue from 'vue'

  export default Vue.extend({
    name: "CheckBrowserSDKInstalled",
    data() {
      return {
        installed: false,
        checking: true,
        error: ''
      }
    },
    mounted () {
        const self = this;
        self.checking = true;

        jabraService.safeInit().then(()=> {
            self.installed = true;
        }).catch(e => {
            self.installed = false;
            self.error = e;
            console.log(e);
        }).finally(() => {
          self.checking = false;
        });
    }
  })
</script>

