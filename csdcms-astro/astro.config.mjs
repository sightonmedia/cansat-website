import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },

  output: "hybrid",
  adapter: cloudflare()
});