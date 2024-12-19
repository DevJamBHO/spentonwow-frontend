let language: 'en' | 'fr';

const detectLanguage = () => {
    if (typeof navigator !== 'undefined' && navigator.language.startsWith('fr')) {
        language = 'fr';
    } else {
        language = 'en';
    }
    return language;
};

const setLanguage = (lang: 'en' | 'fr') => {
    language = lang;
    localStorage.setItem('language', lang);
    window.location.href = `/${lang}`;
};

const getLanguage = (): string => {
    if (!language) {
        if (typeof window === 'undefined') {
            return 'en';
        }
        if (localStorage.getItem('language')) {
            return localStorage.getItem('language') as string;
        }
        return detectLanguage();
    }
    return language;
};

export { getLanguage, setLanguage, detectLanguage };