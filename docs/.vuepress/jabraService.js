import * as jabra from '@gnaudio/jabra-browser-integration';

/**
 * Implements Jabra business logic for interactive demo.
 * 
 * The documentation has unique needs for initialization/shutdown
 * that are not common for most applications. Thus, this service 
 * keep track of initialization state of the jabra sdk, so jabra 
 * sdk instances can be reused/shutdown without errors. Because 
 * both init and shutdown are async this is quite complicted.
 * 
 * Nb. A future change in the browser API to permit 
 * multiple init calls without failure would eliminate much 
 * of the code in this class.
 */
export default new class {
    constructor() {
        // Use these two promises to keep track of async operations.
        this.initializationPromise = null;
        this.shutdownPromise = null;

        // Optional logging that can be manually enabled.
        this.logging = false;
        if (this.logging) {
         console.log("JabraService started!")
        }
    }

    /**
     * Safe shutdown method that only shutdown API if it was initialized.
     * @return {Promise} Promise that resolved when shutdown.
     */
    safeShutdown() {
        if (this.logging) {
            console.log("JabraService.safeShutdown called")
        }
        if (this.shutdownPromise) { // Already in progress?
            return this.shutdownPromise;
        }

        if (this.initializationPromise) {
            this.shutdownPromise = this.initializationPromise
                .then(() => { // Initialized so shutdown
                    return jabra.shutdown()
                                .then(() => {
                                    // Now that we are shutdown we can init again.
                                    this.initializationPromise = null; 
                                }).catch(e => {
                                    // Shutdown failed
                                    console.error(e);
                                    // this.initializationPromise = null;
                                    return Promise.reject(e);
                                });
                }).catch(e => { // Not initialized so no shutdown
                    console.error(e);
                    this.initializationPromise = null; // Allow failed init to try again.
                    return Promise.resolve();
                });

            return this.shutdownPromise;
        } else {
            return Promise.resolve();
        }
    }

    /**
     * Init method that registers when API is initialized, 
     * in order so support safe operations as well. Useful
     * to demonstrate possible error messages as it can still
     * fail if called explicitly twice.
     * 
     * Should be used instead of raw jabra.init(). 
     * @return {Promise} Promise that resolved when initialized.
     */
    init() {
        if (this.logging) {
            console.log("JabraService.init called")
        }

        const self = this;

        function doInit() {
            const localInitializationPromise = jabra.init().then(e => {
                self.shutdownPromise = null; // Now we are initialized, we can shutdown again.
            }).catch(e => {
                self.shutdownPromise = null; // Now we finished trying to initialize, we can shutdown again.
                console.error(e);
                return Promise.reject(e);
            });

            // This method may be called even though we are initialized
            // already. Only override our saved initializationPromise if
            // it is not. Otherwise we may later think a failure indicates
            // that we are not initialized anymore.
            if (!self.initializationPromise) {
                self.initializationPromise = localInitializationPromise;
            }

            return localInitializationPromise;
        }

        if (this.shutdownPromise) { // Previous shutdown - wait for it to finish.
            return this.shutdownPromise.then(() => { // Shutdown success so init
                return doInit();
            }).catch(e => { // Not shutdown sucessfully but try init anyway
                return doInit();
            });
        } else { // No previously shutdown so just init
            return doInit();
        }
    }

    /**
     * Forgiving init method that ignores if API is already 
     * initialized (to avoid error).
     * @return {Promise} Promise that resolves when initialized.
     */
    safeInit() {
        if (this.logging) {
            console.log("JabraService.safeInit called")
        }

        const self = this;

        function doInit() {
            if (self.initializationPromise) { // Already in progress?
                return self.initializationPromise;
            }

            self.initializationPromise = jabra.init().then(e => {
                self.shutdownPromise = null; // Now we are initialized, we can shutdown again.
            }).catch(e => {
                self.shutdownPromise = null; // Now we finished trying to initialize, we can shutdown again.
                console.error(e);
                return Promise.reject(e);
            });
    
            return self.initializationPromise;
        }

        if (this.shutdownPromise) { // Previous shutdown - wait for it to finish.
            return this.shutdownPromise.then(() => { // Shutdown success so init
                return doInit();
            }).catch(e => { // Not shutdown sucessfully but try init anyway
                return doInit();
            });
        } else { // No previously shutdown so just init
            return doInit();
        }
    }

    /**
     * Forgiving re-init method combines safe shut down with
     * safe init to produce a pristine instance (with not events
     * subscribed etc).
     * @return {Promise} Promise that resolves when re-initialized.
     */
    safeReInit() {
        if (this.logging) {
            console.log("JabraService.safeReInit called")
        }

        return this.safeShutdown()
                   .then(() => this.init());   
    }

    getDevices(includeBrowserMediaDeviceInfo) {
        return jabra.getDevices(includeBrowserMediaDeviceInfo);
    }

    getActiveDevice(includeBrowserMediaDeviceInfo) {
        return jabra.getActiveDevice(includeBrowserMediaDeviceInfo);
    }

    setActiveDeviceId(id) {
        return jabra.setActiveDeviceId(id);
    }

    addEventListener(nameSpec, callback) {
        return jabra.addEventListener(nameSpec, callback);
    }

    removeEventListener(nameSpec) {
        return jabra.removeEventListener(namespec, callback);
    }

    setDeviceOutput(audioElement)
    {
        return jabra.getActiveDevice(true).then((deviceInfo) => {
            return jabra.trySetDeviceOutput(audioElement, deviceInfo).then((success) => {
              return success ? deviceInfo : Promise.reject("Unable to set output");
            });
        });
    }

    checkVersion() {
        return true; // TODO:
    }
 }