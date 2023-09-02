import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi, { type HttpBackendOptions } from "i18next-http-backend";

//export const namespaces = ["footer", "index", "printpdfcomponent", "shared", "languagePopup", "navigation", "contactForm"];
export const namespaces = ["contactForm"];
export const defaultNS = "common";
export const supportedLngs = ["cs", "en"];
export const fallbackLng = "en";

const baseUrl = import.meta.env.BASE_URL;

i18next
    .use(HttpApi)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init<HttpBackendOptions>({
        debug: !import.meta.env.PROD,
        ns: namespaces,
        defaultNS: defaultNS,
        fallbackLng: fallbackLng,
        supportedLngs: supportedLngs,
        backend: {
            loadPath: "http://localhost:4321/locales/{{lng}}/{{ns}}.json",
        },
        react: {
            //bindI18n: false,
            //useSuspense: false,
        },
    });
