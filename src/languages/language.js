import LocalizedStrings from "react-localization";

export const strings = new LocalizedStrings({
  en: english,
  fr: french,
  it: italian,
});

export function updateLanguage(language) {
  strings.setLanguage(language);
}
