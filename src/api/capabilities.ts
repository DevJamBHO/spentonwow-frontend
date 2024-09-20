// utils/apiService.ts
import {apiFetch} from "@/utils/apiService";

export const getCapabilities = async (lang: string) => {
    return apiFetch(`/capabilities?lang=${lang}`);
};