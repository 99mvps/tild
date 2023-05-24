import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    baseUrl: "http://localhost/",
    ADMIN: {
      username: "root@99mvps.dev",
      password: "123123",
    },
    STREAMER: {
      username: "root+one@99mvps.dev",
      password: "123123",
    },
  },
  defaultCommandTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
