import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { translate as originalTranslate } from '@/utils/translate';

const TranslationContext = createContext({ translate: (key: string) => key });

export const TranslationProvider: React.FC<{ children: ReactNode, initialTranslations: Record<string, string> }> = ({ children, initialTranslations }) => {
    const [translations, setTranslations] = useState<Record<string, string>>(initialTranslations);

    useEffect(() => {
        setTranslations(initialTranslations);
    }, [initialTranslations]);

    const translate = (key: string): string => {
        return translations[key] || originalTranslate(key);
    };

    return (
        <TranslationContext.Provider value={{ translate }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => useContext(TranslationContext);