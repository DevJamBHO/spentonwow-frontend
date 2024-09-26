// file: utils/formatCurrency.ts

interface FormatCurrencyOptions {
    currency?: string;
    locale?: string;
    fractionDigits?: number;
    symbolDisplay?: 'code' | 'symbol' | 'name';
}

export const formatCurrency = (
    amount: number,
    options: FormatCurrencyOptions = {}
): string => {
    const {
        currency = 'USD',
        locale = 'en-US',
        fractionDigits = 2,
        symbolDisplay = 'symbol',
    } = options;

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
        currencyDisplay: symbolDisplay,
    }).format(amount);
};

export const formatGold = (amount: number): string => {
    const gold = Math.floor(amount / 10000);

    return `${gold}g`;
};