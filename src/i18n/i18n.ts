export const defaultLocale = "cs";
export const locales = {
    en: "en-US",
    cs: "cs-CZ"
};

export const getLocales = (): string[] => {
    const localeArray: string[] = [];
    Object.entries(locales).forEach(([key]) => {localeArray.push(key)})
    return localeArray;
}