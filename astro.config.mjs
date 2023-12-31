import { defineConfig } from "astro/config";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";
const { SITE_URL, SITE_BASE } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// i18n
const defaultLocale = "cs";
const locales = {
    en: "en",
    cs: "cs",
};

// https://astro.build/config
export default defineConfig({
    site: SITE_URL,
    base: SITE_BASE,
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
