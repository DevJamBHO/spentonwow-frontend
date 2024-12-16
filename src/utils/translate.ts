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


function formatCountString(str :string, count :number) {
    const usePlural = count > 1;
    return str.replace(
        /(\d+)\s*\{count_singular:([^,]+),count_plural:([^}]+)\}/,
        (match, count, singular, plural) => `${count} ${usePlural ? plural : singular}`
    );
}

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

    if (props?.count || props?.count === 0) {
        translation = formatCountString(translation.replace('{count}', props.count), props.count as number);
    }

    return translation;
};

export { translate };