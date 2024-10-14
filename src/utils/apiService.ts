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

        // Vérifier si la réponse est au format JSON
        if (response.headers.get('Content-Type')?.includes('application/json')) {
            return await response.json();
        }

        // Sinon, retourner le texte brut
        return await response.text();
    } catch (error) {
        console.error('Erreur lors de la requête fetch:', error);
        throw error;
    }
};