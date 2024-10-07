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

const translate = (key: string, props?: Record<string, string | number>): string => {
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

    if (props?.count) {
        translation = props.count === 1 ? `${props.count} ${props.count_singular}` : `${props.count} ${props.count_plural}`
    }

    return translation;
};

export { translate };