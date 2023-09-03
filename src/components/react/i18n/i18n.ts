import i18next from "i18next";
import HttpApi, { type HttpBackendOptions } from "i18next-http-backend";
import FsBackend, { type FsBackendOptions } from "i18next-fs-backend";
import { getLocales, defaultLocale } from "../../../i18n/i18n";

//export const namespaces = ["footer", "index", "printpdfcomponent", "shared", "languagePopup", "navigation", "contactForm"];
export const supportedLngs = getLocales();
export const fallbackLng = defaultLocale;

// This is a workaround, because without the whole path, backend complains about invalid URL.
const site = import.meta.env.BASE_URL;

// Use different inits for i18n - one on server and one client
// The server one runs on build and locally on dev server
// The client one should load by HTTP requests
if (import.meta.env.SSR) {
    i18next
        .use(FsBackend)
        .init<FsBackendOptions>({
            debug: true,
            ns: ["contactForm"],
            defaultNS: "",
            fallbackLng: fallbackLng,
            supportedLngs: supportedLngs,
            backend: {
                loadPath: "./public/locales/{{lng}}/{{ns}}.json",
            },
        });
} else {
    i18next
        .use(HttpApi)
        .init<HttpBackendOptions>({
            debug: true,
            ns: ["contactForm"],
            defaultNS: "",
            fallbackLng: fallbackLng,
            supportedLngs: supportedLngs,
            backend: {
                loadPath: `${site}locales/{{lng}}/{{ns}}.json`,
            },
        });
}
