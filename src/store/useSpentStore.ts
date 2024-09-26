// @/store/useSpentStore.ts
import { create } from 'zustand';
import { apiFetch } from '@/utils/apiService';
import useTokenStore from "@/store/useTokenStore";

interface SpentState {
    currency: string;
    result: any;
    goldEquivalent: number;
    setResult: (result: any) => void;
    setCurrency: (value: string) => void;
    fetchSpentData: (region: string | string[], server: string | string[], character: string | string[]) => Promise<void>;
}

const useSpentStore = create<SpentState>((set, get) => ({
    currency: 'EUR',
    result: null,
    goldEquivalent: -1,
    setCurrency: (value) => set({ currency: value }),
    setResult: (result) => set({ result, goldEquivalent: result }),
    fetchSpentData: async (region, server, character) => {
        const endpoint = `/spent/${region}?character=${server},${character}`;
        try {
            const data = await apiFetch(endpoint);
            const processedData = processSpentData(data);
            console.log('olb', processedData);

            set({ result: processedData, goldEquivalent: processedData.token_price });

            const setTokenPrice = useTokenStore.getState().setTokenPriceInRealMoney;
            setTokenPrice(data.token_price);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }
}));

const processSpentData = (data: any) => {
    return data;
};

export default useSpentStore;