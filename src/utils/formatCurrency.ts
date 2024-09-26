interface FormatCurrencyOptions {
    currency?: string;
    locale?: string;
    fractionDigits?: number;
    symbolDisplay?: 'code' | 'symbol' | 'name';
}

const currencyLocaleMap: { [key: string]: string } = {
    'USD': 'en-US',
    'EUR': 'fr-FR',
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
    const gold = Math.floor(amount);
    let formattedGold = '';

    if (gold >= 1_000_000_000_000) {
        formattedGold = (gold / 1_000_000_000_000).toFixed(1) + 'T'; // Trillions
    } else if (gold >= 1_000_000_000) {
        formattedGold = (gold / 1_000_000_000).toFixed(1) + 'B'; // Billions
    } else if (gold >= 1_000_000) {
        formattedGold = (gold / 1_000_000).toFixed(1) + 'M'; // Millions
    } else if (gold >= 1_000) {
        formattedGold = (gold / 1_000).toFixed(1) + 'k'; // Thousands
    } else {
        formattedGold = gold.toString();
    }

    return `${formattedGold}g`;
};