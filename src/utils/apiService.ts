import {translate} from "@/utils/translate";

export class RedirectException extends Error {
    constructor(public path: string) {
        super(`${translate('redirect')} ${path}`);
        this.name = "RedirectException";
    }
}

export const apiFetch = async (url: string, options: RequestInit = {}) => {
    const isFormData = options.body instanceof FormData;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const headers: Record<string, string> = {
        ...(options.headers ? options.headers as Record<string, string> : {}),
    };

    if (!isFormData && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(`${baseUrl}${url}`, {
            ...options,
            headers,
        });
        if (response.status !== 200) {
            throw new RedirectException('/404');
        }
        if (response.headers.get('Content-Type')?.includes('application/json')) {
            return await response.json();
        }
        return await response.text();
    } catch (error) {
        throw error;
    }
};