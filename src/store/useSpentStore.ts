import { create } from 'zustand';
import { apiFetch } from '@/utils/apiService';
import useTokenStore from "@/store/useTokenStore";

export interface Cost {
    dol: number;
    eur: number;
}

export interface SpentDetail {
    name: string;
    owned: boolean;
    Versions?: { edition: string; owned: boolean; cost: Cost }[];
    cost: Cost;
    wow_head_link?: {id: number; path: string; type: string}
}

export interface SubscriptionDetail {
    estimated_cost: Cost;
    estimated_months: number;
    periods: SubscriptionPeriod[];
}

export interface SubscriptionPeriod {
    start_date: string;
    end_date: string;
    months: number;
}

interface SpentState {
    currency: "EUR" | "USD";
    amountEur: number;
    amountUsd: number;
    amountInCurrentCurrency: number;
    extensions: SpentDetail[];
    shop: { mounts: SpentDetail[]; pets: SpentDetail[] };
    subscription: SubscriptionDetail;
    setCurrency: (value: "EUR" | "USD") => void;
    fetchSpentData: (region: string | string[], server: string | string[], character: string | string[]) => Promise<void>;
}

const useSpentStore = create<SpentState>((set, get) => ({
    currency: 'EUR',
    amountEur: 0,
    amountUsd: 0,
    extensions: [],
    shop: { mounts: [], pets: [] },
    subscription: {
        estimated_cost: { eur: 0, dol: 0 },
        estimated_months: 0,
        periods: []
    },
    setCurrency: (value) => set({ currency: value }),
    fetchSpentData: async (region, server, character) => {
        const endpoint = `/spent/${region}?character=${server},${character}`;
        try {
            const data = await apiFetch(endpoint);
            const state = get();

            const setTokenPrice = useTokenStore.getState().setTokenPriceInRealMoney;
            const setGoldPrice = useTokenStore.getState().setGoldPerToken;

            setGoldPrice(data.token.gold_cost);
            setTokenPrice(data.token.cost);
            state.shop = data.shop
            state.subscription = data.subscription
            state.extensions = data.expansions

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