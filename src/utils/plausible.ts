interface PlausibleProps {
    [key: string]: any;
}

declare global {
    interface Window {
        plausible: (eventName: string, options?: {props: PlausibleProps}) => void;
    }
}

/**
 * Fonction pour déclencher un événement Plausible.
 * @param {string} eventName - Le nom de l'événement Plausible.
 * @param {PlausibleProps} props - Les propriétés supplémentaires à envoyer avec l'événement.
 */
export const trackPlausibleEvent = (eventName: string, props?: PlausibleProps) => {
    if (typeof window !== 'undefined' && window.plausible) {
        if (props) {
            window.plausible(eventName, { props });
        } else {
            window.plausible(eventName);
        }
    } else {
        console.warn('Plausible n\'est pas défini.');
    }
};