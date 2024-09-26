import { create } from 'zustand';

interface TokenState {
    tokenPriceInRealMoney: {dol: number, eur: number};
    goldPerToken: number;
    setTokenPriceInRealMoney: (price: {dol: number, eur: number}) => void;
    setGoldPerToken: (amount: number) => void;
}

const useTokenStore = create<TokenState>((set) => ({
    tokenPriceInRealMoney: {dol: 0, eur: 0},
    goldPerToken: 20,
    setTokenPriceInRealMoney: (price: {dol: number, eur: number}) => {
        set({ tokenPriceInRealMoney: price });
    },
    setGoldPerToken: (amount: number) => set({ goldPerToken: amount }),
}));

export default useTokenStore;