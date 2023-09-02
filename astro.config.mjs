import { defineConfig } from "astro/config";
import { i18n, defaultLocaleSitemapFilter } from "astro-i18n-aut/integration";
import react from "@astrojs/react";

export const defaultLocale = "cs";
const locales = {
    en: "en", // the `defaultLocale` value must present in `locales` keys
    cs: "cs",
};

// https://astro.build/config
export default defineConfig({
    site: "https://dallyh.github.io/",
    base: import.meta.env.DEV ? "" : "/website-concept",
    trailingSlash: "always",
    integrations: [
        react(),
        i18n({
            locales,
            defaultLocale,
        }),
    ],
});
