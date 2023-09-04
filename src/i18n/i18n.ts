import i18next from "i18next";
import FsBackend, { type FsBackendOptions } from "i18next-fs-backend";
import { defaultLocale, getLocales } from "./locales";

const i18nConfig = {
    debug: true,
    ns: [],
    defaultNS: "",
    fallbackLng: defaultLocale,
    supportedLngs: getLocales(),
};

const i18n = i18next
    .createInstance({
        ...i18nConfig,
        backend: {
            loadPath: "./src/i18n/locales/{{lng}}/{{ns}}.json",
        },
    })
    .use(FsBackend);

export const t = i18n.t;

export const loadNamespaces = async (locale: string, namespaces: string[]) => {
    if (!i18n.isInitialized) {
        console.warn("loadNamespaces: i18n is not initialized.")
        return;
    }

    if (i18n.language !== locale) {
        await i18n.changeLanguage(locale);
    }

    await i18n.loadNamespaces(namespaces);
}

export default i18n;