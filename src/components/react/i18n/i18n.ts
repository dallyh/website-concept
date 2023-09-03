import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi, { type HttpBackendOptions } from "i18next-http-backend";
import { getLocales, defaultLocale } from "../../../i18n/i18n";

//export const namespaces = ["footer", "index", "printpdfcomponent", "shared", "languagePopup", "navigation", "contactForm"];
export const defaultNS = "common";
export const supportedLngs = getLocales();
export const fallbackLng = defaultLocale;

// This is a workaround, because without the whole path, backend complains about invalid URL.
const site = import.meta.env.PROD ? import.meta.env.SITE : "http://localhost:4321";

i18next
    .use(HttpApi)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init<HttpBackendOptions>({
        debug: !import.meta.env.PROD,
        ns: [],
        defaultNS: "",
        fallbackLng: fallbackLng,
        supportedLngs: supportedLngs,
        backend: {
            loadPath: `${site}/locales/{{lng}}/{{ns}}.json`,
        }
    });
