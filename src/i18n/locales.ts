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

/* Translation typings */
export type ContactForm = typeof import("./locales/en/contactForm.json");
export type Footer = typeof import("./locales/en/footer.json");
export type Index = typeof import("./locales/en/index.json");
export type LanguagePopup = typeof import("./locales/en/languagePopup.json");
export type Nav = typeof import("./locales/en/navigation.json");
export type PrintPdf = typeof import("./locales/en/printpdfcomponent.json");
export type Shared = typeof import("./locales/en/shared.json");

export default {}