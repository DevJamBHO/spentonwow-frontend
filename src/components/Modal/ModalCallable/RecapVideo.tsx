import React, { useEffect, useState } from 'react';
import VideoWrapper from "@/components/VideoWrapper";

const RecapVideo: React.FC = () => {
    const words = ["Bonjour", "Salut", "Coucou", "Hola", "Au revoir"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <VideoWrapper>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', backgroundColor: '#121212', color: '#E0E0E0', fontSize: '60px', textAlign: 'center' }}>
                {words[index]}
            </div>
        </VideoWrapper>
    );
};

export default RecapVideo;