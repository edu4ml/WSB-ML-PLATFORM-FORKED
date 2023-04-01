const { defineConfig } = require('cypress');

module.exports = defineConfig({
    viewportWidth: 2560,
    viewportHeight: 1480,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,

    retries: {
        runMode: 2,
        openMode: 0,
    },

    e2e: {
        baseUrl: 'http://0.0.0.0:8000',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
