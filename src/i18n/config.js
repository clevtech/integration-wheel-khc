import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import englishLanguage from './locales/en/translations.json';
import kazakhLanguage from './locales/kz/translations.json';
import russianLanguage from './locales/ru/translations.json';

i18n.use(initReactI18next).init({
    lng: 'kz',
    resources: {
        en: {
            translations: englishLanguage,
        },
        kz: {
            translations: kazakhLanguage,
        },
        ru: {
            translations: russianLanguage,
        },
    },
    ns: ['translations'],
    defaultNS: 'translations',
});

i18n.languages = ['en', 'kz', 'ru'];

export default i18n;
