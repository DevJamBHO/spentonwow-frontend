import useTokenStore from '../store/useTokenStore';

export const convertMoneyToGold = (amountSpent: number, currency: string) => {
    const { tokenPriceInRealMoney, goldPerToken } = useTokenStore.getState();
    if (currency === 'USD')
        return (amountSpent / tokenPriceInRealMoney.dol) * goldPerToken;
    return (amountSpent / tokenPriceInRealMoney.eur) * goldPerToken;

};