const { defineConfig } = require('cypress');

module.exports = defineConfig({
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,

    retries: {
        runMode: 2,
        openMode: 0,
    },

    e2e: {
        baseUrl: 'http://127.0.0.1:8000',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
