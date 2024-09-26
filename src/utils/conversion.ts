import useTokenStore from '../store/useTokenStore';

export const convertMoneyToGold = (amountSpent: number, currency: string) => {
    const { tokenPriceInRealMoney, goldPerToken } = useTokenStore.getState();

    const adjustedAmountSpent = currency === 'USD' ? amountSpent * 1.2 : amountSpent;
    return (adjustedAmountSpent / tokenPriceInRealMoney) * goldPerToken;
};