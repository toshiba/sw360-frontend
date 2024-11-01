import { defineConfig } from "cypress"

export default defineConfig({
  defaultCommandTimeout: 25000,
  e2e: {
    retries: 2, 
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('./cypress/support/tasks.ts')(on, config)
    },
  },
});
