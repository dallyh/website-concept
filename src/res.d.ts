/* Translation typings */
import contactFormJson from "../public/locales/en/contactForm.json";

declare module TranslationResources {
    export type contactFormRes = typeof contactFormJson;
}
