import React, { useEffect } from 'react';

const PlausibleScript: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.setAttribute('defer', '');
        script.setAttribute('data-domain', 'spentonwow.com');
        script.src = 'https://plausible.sapling-toss.com/js/script.hash.outbound-links.pageview-props.tagged-events.js';
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.type = 'text/javascript';
        inlineScript.text = `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`;
        document.head.appendChild(inlineScript);
    }, []);

    return null;
};

export default PlausibleScript;
