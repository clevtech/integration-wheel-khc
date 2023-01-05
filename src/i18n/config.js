import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import kazakhLanguage from './locales/kz/translations.json';
import russianLanguage from './locales/ru/translations.json';

i18n.use(initReactI18next).init({
    resources: {
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

i18n.languages = ['kz', 'ru'];

export default i18n;
