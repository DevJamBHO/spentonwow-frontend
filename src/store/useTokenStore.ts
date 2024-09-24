import {create} from 'zustand';

interface TokenState {
    tokenPriceInRealMoney: number;
    goldPerToken: number;
    setTokenPriceInRealMoney: (price: number) => void;
    setGoldPerToken: (amount: number) => void;
}

const useTokenStore = create<TokenState>((set) => ({
    tokenPriceInRealMoney: 20, // Exemple de prix initial en euros ou dollars
    goldPerToken: 200000, // Exemple de montant initial d'or par token
    setTokenPriceInRealMoney: (price: number) => set(state => ({ tokenPriceInRealMoney: price })),
    setGoldPerToken: (amount: number) => set(state => ({ goldPerToken: amount })),
}));

export default useTokenStore;