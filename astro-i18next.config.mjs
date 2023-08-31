const DEV_ENV = process.env.NODE_ENV === "development" ? true : false;

/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
    defaultLocale: "cs",
    locales: ["cs", "en"],
    namespaces: ["footer", "index", "printpdfcomponent", "shared", "languagePopup", "navigation", "contactForm"],
    defaultNamespace: "common",
    load: ["server", "client"],
    i18nextServerPlugins: {
        "{initReactI18next}": "react-i18next",
    },
    i18nextClientPlugins: {
        "{initReactI18next}": "react-i18next",
    },
    i18nextServer: {
        debug: false,
        backend: {
            loadPath: "./public/locales/{{lng}}/{{ns}}.json",
        },
    },
    i18nextClient: {
        debug: false,
        backend: {
            loadPath: "/website-concept/locales/{{lng}}/{{ns}}.json",
        },
    },
};
