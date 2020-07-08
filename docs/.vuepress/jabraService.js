import * as jabra from '@gnaudio/jabra-browser-integration';

/**
 * Implements Jabra business logic for interactive demo.
 */
export default new class {
    constructor() {
        this.isInitialized = false;
    }

    /**
     * Safe shutdown method that only shutdown API if it is initialized.
     * @return {Promise} Promise that resolved when shutdown.
     */
    safeShutdown() {
        if (this.isInitialized) {
            return jabra.shutdown().then(() => {
                this.isInitialized = false;
            }).catch(e => {
                console.error(e);
                return Promise.reject(e);
            });
        } else {
            return Promise.resolve();
        }
    }

    /**
     * Init method that registers when API is initialized, 
     * in order so support safeInit and shutdownIfInitialized.
     * Should be used instead of raw jabra.init() in this demo. 
     * @return {Promise} Promise that resolved when initialized.
     */
    init() {
        return jabra.init().then(() => {
            this.isInitialized=true;
            return;
        }).catch(e => {
            console.error(e);
            return Promise.reject(e);
        });
    }

    /**
     * Forgiving init method that ignores if API is already 
     * initialized (to avoid error).
     * @return {Promise} Promise that resolves when initialized.
     */
    safeInit() {
        if (this.isInitialized) {
            return Promise.resolve();
        } 
        
        if (!this.isInitialized)  {
            return jabra.init().then(() => {
                this.isInitialized=true;
            }).catch(e => {
                console.error(e);
                return Promise.reject(e);
            });
        }
    }

    checkVersion() {
        return true;
    }
 }