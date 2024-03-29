import { createI18n } from 'vue-i18n'
import en from "@/locales/en.json"
import pl from "@/locales/pl.json"
// https://www.science.co.il/language/Locale-codes.php

export default createI18n({
    locale: "en",
    fallbackLocale: "en",
    messages: {
        en,
        pl
    },
    numberFormats: {
        en: {
            currency: {
                style: "currency", 
                currency: "USD"  //or time
            }
        },
        pl: {
            currency: {
                style: "currency", 
                currency: "PLN"  //or time
            }
        },
    }
})