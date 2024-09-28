// components/Layout.tsx
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Layout.module.scss';
import {translate} from "@/utils/translate";

interface LayoutProps {
    children: React.ReactNode;
    big?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, big = false }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
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
        <>
            <Head>
                <meta charSet="UTF-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="World of Warcraft spending, WoW spending tracker, WoW expenses, track WoW expenses, WoW in-game purchases, WoW spending calculator, how much spent on WoW, WoW spending history, WoW expense tracker, total spent on WoW, WoW subscription cost, WoW microtransactions, WoW financial tracking, WoW game expenses, WoW money spent, WoW payment history, WoW spending analysis, Blizzard spending tracker" />
                <meta name="author" content="Bakreal and Bloxas" />
                <meta name="theme-color" content="#FFD700" />
                <meta name="robots" content="index, follow" />
                <meta name="msapplication-TileColor" content="#18181C" />
                <meta name="msapplication-TileImage" content="/logo512.webp" />
                <meta property="og:title" content="Spentonwow.com" />
                <meta property="og:image" content="/logo.webp" />
                <meta property="og:url" content="https://Spentonwow.com/" />
                <meta property="og:site_name" content="Spentonwow" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
            </Head>
            <div className={`${styles.root} ${big ? styles.big : ''}`} style={{ backgroundImage: !videoSupported ? "url('/images/background.webp')" : 'none' }}>
                {videoSupported && (
                    <video ref={videoRef} className={styles.backgroundVideo} muted>
                        <source src="/videos/background.webm" type="video/webm" />
                    </video>
                )}
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;