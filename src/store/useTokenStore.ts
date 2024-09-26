import { create } from 'zustand';

interface TokenState {
    tokenPriceInRealMoney: number;
    goldPerToken: number;
    setTokenPriceInRealMoney: (price: number) => void;
    setGoldPerToken: (amount: number) => void;
}

const useTokenStore = create<TokenState>((set) => ({
    tokenPriceInRealMoney: 0,
    goldPerToken: 200000,
    setTokenPriceInRealMoney: (price: number) => {
        set({ tokenPriceInRealMoney: price });
    },
    setGoldPerToken: (amount: number) => set({ goldPerToken: amount }),
}));

export default useTokenStore;