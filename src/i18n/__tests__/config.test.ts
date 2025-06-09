import { locales, defaultLocale, localeNames, localeFlags } from "../config";

describe("i18n config", () => {
  it("should have correct locales", () => {
    expect(locales).toEqual(["id", "en"]);
  });

  it("should have correct default locale", () => {
    expect(defaultLocale).toBe("id");
  });

  it("should have locale names for all locales", () => {
    expect(localeNames).toEqual({
      id: "Bahasa Indonesia",
      en: "English",
    });
  });

  it("should have locale flags for all locales", () => {
    expect(localeFlags).toEqual({
      id: "🇮🇩",
      en: "🇺🇸",
    });
  });

  it("should have consistent locale keys", () => {
    const localeKeys = Object.keys(localeNames);
    const flagKeys = Object.keys(localeFlags);
    
    expect(localeKeys).toEqual(locales);
    expect(flagKeys).toEqual(locales);
  });
});
