import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const RecapImage: React.FC = () => {
    const captureRef = useRef<HTMLDivElement>(null);

    const handleCaptureClick = async () => {
        if (captureRef.current) {
            const canvas = await html2canvas(captureRef.current);
            const image = canvas.toDataURL('image/jpeg');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'recap.jpeg';
            link.click();
        }
    };

    return (
        <div>
            <div ref={captureRef} style={{ padding: '20px', textAlign: 'center', border: '1px solid #ccc', backgroundColor: 'red' }}>
                Ceci est le contenu à capturer.
            </div>
            <button onClick={handleCaptureClick} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                Capturer Image
            </button>
        </div>
    );
};

export default RecapImage;