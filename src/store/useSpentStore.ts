import { create } from 'zustand';
import { apiFetch } from '@/utils/apiService';
import useTokenStore from "@/store/useTokenStore";

interface SpentState {
    currency: "EUR" | "USD";
    amountEur: number;
    amountUsd: number;
    setCurrency: (value: "EUR" | "USD") => void;
    fetchSpentData: (region: string | string[], server: string | string[], character: string | string[]) => Promise<void>;
    amountInCurrentCurrency: number;
}

const useSpentStore = create<SpentState>((set, get) => ({
    currency: 'EUR',
    amountEur: 0,
    amountUsd: 0 ,
    setCurrency: (value) => set({ currency: value }),
    fetchSpentData: async (region, server, character) => {
        const endpoint = `/spent/${region}?character=${server},${character}`;
        try {
            const data = await apiFetch(endpoint);

            const setTokenPrice = useTokenStore.getState().setTokenPriceInRealMoney;
            setTokenPrice(data.token.gold_cost);

            set(state => ({
                ...state,
                amountEur: data.estimated_total.eur,
                amountUsd: data.estimated_total.dol,
            }));

        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    },
    get amountInCurrentCurrency() {
        const state = get();
        return state.currency === 'USD' ? state.amountUsd : state.amountEur;
    },
}));

export default useSpentStore;