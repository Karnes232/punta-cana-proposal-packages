/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import path from "node:path";
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({
  api: { projectId, dataset },
  // Resolve the "@/" tsconfig path alias used by the custom Studio tools.
  vite: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@": path.resolve(__dirname, "src"),
      },
    },
  }),
});
