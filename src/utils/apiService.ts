// utils/apiService.ts
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const baseUrl = 'https://api.wowchievement.com';
    const url = `${baseUrl}${endpoint}`;

    const defaultOptions: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    try {
        const response = await fetch(url, defaultOptions);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};