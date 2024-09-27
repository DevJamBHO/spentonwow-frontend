import { useEffect, FC } from 'react';

// Déclaration pour étendre le type Window
declare global {
    interface Window {
        adsbygoogle?: {
            loaded: boolean;
            push: any;
        };
    }
}

interface AdBlockDetectorProps {
    onDetect: (detected: boolean) => void;
}

const AdBlockDetector: FC<AdBlockDetectorProps> = ({ onDetect }) => {
    useEffect(() => {
        const checkDOMElements = () => {
            // Création d'un élément typiquement bloqué par les adblockers
            const adTest = document.createElement('div');
            adTest.className = 'adsbygoogle';
            adTest.style.width = '1px';
            adTest.style.height = '1px';
            adTest.style.position = 'absolute';
            adTest.style.left = '-9999px';
            document.body.appendChild(adTest);

            window.setTimeout(() => {
                const adBlocked = !adTest.offsetParent || adTest.offsetHeight === 0 || adTest.offsetWidth === 0;
                document.body.removeChild(adTest);

                if (adBlocked) {
                    onDetect(true);
                } else {
                    checkNetworkElements();
                }
            }, 100);
        };

        const checkNetworkElements = () => {
            // Vérification du chargement d'un script publicitaire
            const testScript = document.createElement('script');
            testScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            document.body.appendChild(testScript);

            testScript.onload = () => {
                checkAdBlockerModifications(testScript);
            };

            testScript.onerror = () => {
                onDetect(true);
                document.body.removeChild(testScript);
            };

            setTimeout(() => {
                if (document.body.contains(testScript)) {
                    document.body.removeChild(testScript);
                    onDetect(true);
                }
            }, 2000);
        };

        const checkAdBlockerModifications = (testScript: HTMLScriptElement) => {
            // Vérification des modifications faites par les bloqueurs de publicité
            const detected = (window.adsbygoogle && window.adsbygoogle.loaded && !window.adsbygoogle.push.length) ?? true;
            document.body.removeChild(testScript);
            onDetect(detected);
        };

        // Détection initiale
        const detectAdBlock = () => {
            checkDOMElements();
        };

        detectAdBlock();
    }, [onDetect]);

    return null;
};

export default AdBlockDetector;