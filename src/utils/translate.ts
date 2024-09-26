import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import { getLanguage } from './language';

interface GenericTranslations {
    [key: string]: string | GenericTranslations;
}

const translations: Record<string, GenericTranslations> = {
    en,
    fr,
};

const translate = (key: string): string => {
    const lang = getLanguage();
    const keys = key.split('.');
    let translation: any = translations[lang];

    for (const k of keys) {
        if (translation[k]) {
            translation = translation[k];
        } else {
            return key;
        }
    }

    return translation;
};


export { translate };