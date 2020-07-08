import * as jabra from '@gnaudio/jabra-browser-integration';

// This file contans unexecuted code from steps used for syntax validation only.

function step1() {
    jabra.init().then(() => {
        // Add Your code to execute when initialized here.
        console.log("SUCCESS")
    }).catch(e => {
        // Add custom error handling code here.
        console.error(e);
    });
}
