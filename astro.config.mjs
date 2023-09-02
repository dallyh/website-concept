import { defineConfig } from "astro/config";
import { i18n, defaultLocaleSitemapFilter } from "astro-i18n-aut/integration";
import react from "@astrojs/react";
import {defaultLocale} from "./src/i18n/i18n";
import {locales} from "./src/i18n/i18n";

// https://astro.build/config
export default defineConfig({
    site: "https://dallyh.github.io/",
    base: import.meta.env.DEV ? "/website-concept" : "/website-concept",
    trailingSlash: "always",
    integrations: [
        react(),
        i18n({
            locales,
            defaultLocale,
        }),
    ],
});
