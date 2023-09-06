import i18next from "i18next";
import FsBackend from "i18next-fs-backend";
import { defaultLocale, localeKeys } from "astro-i18n-aut";

const i18nConfig = {
    debug: true,
    ns: [],
    defaultNS: "",
    fallbackLng: defaultLocale,
    supportedLngs: localeKeys,
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
    console.debug("loadNamespaces: loading namespaces: " + namespaces);
    if (!i18n.isInitialized) {
        console.warn("loadNamespaces: i18n is not initialized. Trying to init.");
        await initOnce();
    }

    if (i18n.language !== locale) {
        await i18n.changeLanguage(locale);
    }

    await i18n.loadNamespaces(namespaces);
};

const initOnce = async () => {
    if (!i18n.isInitialized) {
        console.debug("initOnce: i18n start init.");
        await i18n.init().then(() => {
            console.debug("initOnce: i18n was initialized.");
        });
    }
};

export default i18n;
