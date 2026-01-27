  const DATEFNS_LOCALE_ALIASES = {
      en: "en-US",
      en_us: "en-US",
      fr: "fr",
      fr_fr: "fr",
      fr_ca: "fr-CA",
      fr_ch: "fr-CH",
      pt: "pt",
      pt_pt: "pt",
      pt_br: "pt-BR",
      es: "es",
      es_es: "es",
      es_mx: "es",
      es_ar: "es",
      es_do: "es-DO",
  };

export const getLocale = () => {
    let rawLocale = localStorage.getItem("NG_TRANSLATE_LANG_KEY");

    rawLocale = String(rawLocale || "")
      .trim()
      .replace("-", "_")
      .toLowerCase();

    if (!rawLocale || ["und", "null", "undefined"].includes(rawLocale)) {
      return "en-US";
    }

    const base = rawLocale.split("_")[0];

    return DATEFNS_LOCALE_ALIASES[rawLocale] || DATEFNS_LOCALE_ALIASES[base] || "en-US";
};