import { getLocale } from "astro-i18n-aut";
import { defaultLocale } from "./i18n";

export function getLocaleEx(astro: AstroGlobal): string {
    let locale = getLocale(astro.url);

    if (locale === undefined)
    {
        console.debug("getLocale: Locale was undefined: " + defaultLocale)
        return defaultLocale;
    }

    console.debug("getLocale: Locale was: " + defaultLocale)
    return locale;
}