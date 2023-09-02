import { getLocale } from "astro-i18n-aut";
import { defaultLocale } from "../../astro.config.mjs";

export function getLocaleEx(astro: AstroGlobal): string {
    let locale = getLocale(astro.url);

    if (locale === undefined)
    {
        return defaultLocale;
    }

    return locale;
}