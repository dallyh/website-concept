import i18next from "i18next";
import HttpApi, { type HttpBackendOptions } from "i18next-http-backend";
import FsBackend, { type FsBackendOptions } from "i18next-fs-backend";

export const defaultLocale = "cs";
export const locales = {
    en: "en-US",
    cs: "cs-CZ",
};

export const getLocales = (): string[] => {
    const localeArray: string[] = [];
    Object.entries(locales).forEach(([key]) => {
        localeArray.push(key);
    });
    return localeArray;
};

// This is a workaround, because without the whole path, backend complains about invalid URL.
const site = import.meta.env.BASE_URL;

const i18nConfig = {
    debug: true,
    ns: [""],
    defaultNS: "",
    fallbackLng: defaultLocale,
    supportedLngs: getLocales(),
};


// Use different inits for i18n - one on server and one client
// The server one runs on build and locally on dev server
// The client one should load by HTTP requests
if (import.meta.env.SSR) {
    console.debug("Initializing i18next");
    i18next.use(FsBackend).init<FsBackendOptions>({
        debug: true,
        ns: [],
        defaultNS: "",
        fallbackLng: defaultLocale,
        supportedLngs: getLocales(),
        backend: {
            loadPath: "./public/locales/{{lng}}/{{ns}}.json",
        },
    });
} else {
    i18next.use(HttpApi).init<HttpBackendOptions>({
        debug: true,
        ns: [""],
        defaultNS: "",
        fallbackLng: defaultLocale,
        supportedLngs: getLocales(),
        backend: {
            loadPath: `${site}locales/{{lng}}/{{ns}}.json`,
        },
    });
}

export default i18next;
