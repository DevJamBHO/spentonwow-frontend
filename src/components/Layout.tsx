import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Layout.module.scss';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const reverse = useRef(false);
    const [videoSupported, setVideoSupported] = useState(true);

    useEffect(() => {
        const video = videoRef.current;

        if (!video || video.canPlayType('video/mp4') === "") {
            setVideoSupported(false);
            return;
        }

        const handleVideoEnd = () => {
            reverse.current = !reverse.current;
            if (reverse.current) {
                playVideoBackward();
            } else {
                video.play();
            }
        };

        const playVideoBackward = () => {
            video.pause();
            const interval = setInterval(() => {
                if (video.currentTime <= 0) {
                    clearInterval(interval);
                    reverse.current = !reverse.current;
                    video.play();
                } else {
                    video.currentTime -= 0.1;
                }
            }, 100);
        };

        video.addEventListener('ended', handleVideoEnd);
        video.play();

        return () => {
            video.removeEventListener('ended', handleVideoEnd);
        };
    }, []);

    return (
        <div className={styles.root} style={{ backgroundImage: !videoSupported ? "url('/images/background.png')" : 'none' }}>
            {videoSupported && (
                <video ref={videoRef} className={styles.backgroundVideo} muted>
                    <source src="/videos/background.mp4" type="video/mp4" />
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