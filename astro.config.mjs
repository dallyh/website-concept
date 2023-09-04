import { defineConfig } from "astro/config";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import react from "@astrojs/react";
import { defaultLocale } from "./src/i18n/locales";
import { locales } from "./src/i18n/locales";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: "https://dallyh.github.io",
    base: import.meta.env.PROD ? "/website-concept" : "",
    trailingSlash: "always",
    integrations: [
        react(),
        i18n({
            locales,
            defaultLocale,
        }),
        sitemap({
            i18n: {
                locales,
                defaultLocale,
            },
            filter: filterSitemapByDefaultLocale({ defaultLocale }),
        }),
    ],
});
