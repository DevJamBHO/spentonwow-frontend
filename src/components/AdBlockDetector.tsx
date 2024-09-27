import { useEffect, FC } from 'react';

interface AdBlockDetectorProps {
    onDetect: (detected: boolean) => void;
}

const AdBlockDetector: FC<AdBlockDetectorProps> = ({ onDetect }) => {
    useEffect(() => {
        const testAd = document.createElement('div');
        testAd.className = 'ad-banner';
        testAd.style.display = 'none';

        document.body.appendChild(testAd);

        if (testAd.offsetHeight === 0) {
            // Bloqueur de pub détecté
            onDetect(true);
        } else {
            onDetect(false);
        }

        document.body.removeChild(testAd);
    }, [onDetect]);

    return null;
};

export default AdBlockDetector;