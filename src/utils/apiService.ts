// utils/apiService.ts
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;  // Default to empty string if not set
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

        return await response.json();
    } catch (error) {
        throw error;
    }
};
