interface FormatCurrencyOptions {
    currency?: string;
    locale?: string;
    fractionDigits?: number;
    symbolDisplay?: 'code' | 'symbol' | 'name';
}

const currencyLocaleMap: { [key: string]: string } = {
    'USD': 'en-US',
    'EUR': 'fr-FR', // La locale française gère correctement l'Euro
    // Ajouter d'autres devises et locales si nécessaire
};

export const formatCurrency = (
    amount: number,
    options: FormatCurrencyOptions = {}
): string => {
    const {
        currency = 'USD',
        locale = currencyLocaleMap[currency] || 'en-US', // Utiliser la locale par défaut si inconnue
        fractionDigits = 2,
        symbolDisplay = 'symbol',
    } = options;

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
        currencyDisplay: symbolDisplay,
    }).format(amount);
};

export const formatGold = (amount: number): string => {
    const gold = Math.floor(amount / 10000);
    const silver = Math.floor((amount % 10000) / 100);
    const copper = amount % 100;

    return `${gold}g ${silver}s ${copper}c`;
};