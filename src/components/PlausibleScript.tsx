import { useEffect } from 'react';

const PlausibleScript: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.setAttribute('defer', '');
        script.setAttribute('data-domain', 'spentonwow.com');
        script.src = 'https://plausible.bho.ovh/js/script.js';
        document.head.appendChild(script);
    }, []);

    return null;
};

export default PlausibleScript;