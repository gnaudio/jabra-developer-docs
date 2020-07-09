import * as jabra from '@gnaudio/jabra-browser-integration';

/**
 * Implements Jabra business logic for interactive demo.
 * 
 * Of particular importance is the way this service keep
 * track of initialization state of the jabra sdk, so
 * jabra sdk instances can be reused/shutdown without errors.
 */
export default new class {
    constructor() {
        this.initializationPromise = null;
    }

    /**
     * Safe shutdown method that only shutdown API if it is initialized.
     * @return {Promise} Promise that resolved when shutdown.
     */
    safeShutdown() {
        const initializationCompletePromise = this.initializationPromise || Promise.resolve();
        return initializationCompletePromise
               .then(() => jabra.shutdown())
               .then(() => { this.initializationPromise = null; })
               .catch(e => {
                    console.error(e);
                    return Promise.reject(e);
               });
    }

    /**
     * Init method that registers when API is initialized, 
     * in order so support safe operations as well.
     * Should be used instead of raw jabra.init(). 
     * @return {Promise} Promise that resolved when initialized.
     */
    init() {
        this.initializationPromise = jabra.init().catch(e => {
            console.error(e);
            return Promise.reject(e);
        });

        return this.initializationPromise;
    }

    /**
     * Forgiving init method that ignores if API is already 
     * initialized (to avoid error).
     * @return {Promise} Promise that resolves when initialized.
     */
    safeInit() {
        if (this.initializationPromise) {
            return this.initializationPromise;
        } 
        
        this.initializationPromise = jabra.init().catch(e => {
            console.error(e);
            return Promise.reject(e);
        });

        return this.initializationPromise;
    
    }

    /**
     * Forgiving re-init method combines safe shut down with
     * safe init to produce a pristine instance (with not events
     * subscribed etc).
     * @return {Promise} Promise that resolves when re-initialized.
     */
    safeReInit() {
        return safeShutdown().then(() => init());   
    }

    getDevices(includeBrowserMediaDeviceInfo) {
        return jabra.getDevices(includeBrowserMediaDeviceInfo);
    }

    getActiveDevice(includeBrowserMediaDeviceInfo) {
        return jabra.getActiveDevice(includeBrowserMediaDeviceInfo);
    }

    addEventListener(nameSpec, callback) {
        return jabra.addEventListener(nameSpec, callback);
    }

    removeEventListener(nameSpec) {
        return jabra.removeEventListener(namespec, callback);
    }

    checkVersion() {
        return true; // TODO:
    }
 }