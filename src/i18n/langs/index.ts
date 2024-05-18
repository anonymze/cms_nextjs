import enTranslations from "./en";
import esTranslations from "./es"
import frTranslations from "./fr"

// we use the lang en for the source of truth for typescript
const en : typeof enTranslations = enTranslations;
const es : typeof enTranslations = esTranslations;
const fr : typeof enTranslations = frTranslations;

export default { en, es, fr }