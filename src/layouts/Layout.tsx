import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Layout.module.scss';

interface LayoutProps {
    children: React.ReactNode;
    big?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, big = false }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const reverse = useRef(false);
    const [videoSupported, setVideoSupported] = useState(true);

    useEffect(() => {
        const video = videoRef.current;

        if (!video || typeof video.canPlayType !== 'function' || video.canPlayType('video/mp4') === "") {
            setVideoSupported(false);
            return;
        }
        const handleVideoError = () => {
            setVideoSupported(false);
        };

        video.addEventListener('error', handleVideoError);
        video.play();

        return () => {
            video.removeEventListener('error', handleVideoError);
        };
    }, []);

    return (
        <div className={`${styles.root} ${big ? styles.big : ''}`} style={{ backgroundImage: !videoSupported ? "url('/images/background.webp')" : 'none' }}>
            {videoSupported && (
                <video ref={videoRef} className={styles.backgroundVideo} muted>
                    <source src="/videos/background.webm" type="video/webm" />
                    Votre navigateur ne supporte pas les vidéos HTML5.
                </video>
            )}
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Layout;