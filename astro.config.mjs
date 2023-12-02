import { defineConfig } from "astro/config";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// i18n
const defaultLocale = "cs";
const locales = {
    en: "en-US",
    cs: "cs-CZ",
};

// https://astro.build/config
export default defineConfig({
    site: "https://dallyh.github.io",
    base: "/website-concept",
    trailingSlash: "always",
    build: {
        format: "directory",
    },
    prefetch: true,
    integrations: [
        react(),
        i18n({
            locales,
            defaultLocale
        }),
        sitemap({
            i18n: {
                locales,
                defaultLocale,
            },
            filter: filterSitemapByDefaultLocale({
                defaultLocale,
            }),
        }),
    ],
});
