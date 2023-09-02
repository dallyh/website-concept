import { sequence } from "astro/middleware";
import { i18nMiddleware } from "astro-i18n-aut";
import { defaultLocale } from "../astro.config.mjs";

const i18n = i18nMiddleware({ defaultLocale: defaultLocale });

export const onRequest = sequence(i18n);
