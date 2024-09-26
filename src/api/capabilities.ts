import { apiFetch } from "@/utils/apiService";
import { getLanguage } from "@/utils/language";

export const getCapabilities = () => {
    const lang = getLanguage();
    return apiFetch(`/capabilities?lang=${lang}`);
};