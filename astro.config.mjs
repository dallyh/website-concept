import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://dallyh.github.io',
  base: '/website-concept',
  integrations: [react(), astroI18next()],
});