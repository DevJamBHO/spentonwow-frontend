import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Layout.module.scss';
import Footer from "@/components/Footer";
import Notification from "@/components/Notification";
interface LayoutProps {
    children: React.ReactNode;
    big?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, big = false }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoSupported, setVideoSupported] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const video = videoRef.current;

        if (window.innerWidth <= 600) {
            setIsMobile(true);
        }

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

    const backgroundStyle = isMobile || !videoSupported
        ? { backgroundImage: "url('/images/background.webp')" }
        : {};

    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="keywords" content="World of Warcraft spending, WoW spending tracker, WoW expenses, track WoW expenses, WoW in-game purchases, WoW spending calculator, how much spent on WoW, WoW spending history, WoW expense tracker, total spent on WoW, WoW subscription cost, WoW microtransactions, WoW financial tracking, WoW game expenses, WoW money spent, WoW payment history, WoW spending analysis, Blizzard spending tracker,spent on wow"/>
                <meta name="author" content="Sapling-toss"/>
                <meta name="title" content="Spentonwow"/>
                <meta name="description" content="Spentonwow helps World of Warcraft players track and visualize their spending history on their account. Gain insights into your purchases and manage your gaming budget effectively with our intuitive platform."/>
                <meta name="theme-color" content="#FFD700"/>
                <meta name="robots" content="index, follow"/>
                <meta name="msapplication-TileColor" content="#18181C"/>
                <meta name="msapplication-TileImage" content="/images/logo.webp"/>
                <meta property="og:title" content="Spentonwow.com"/>
                <meta property="og:image" content="/images/logo.webp"/>
                <meta property="og:url" content="https://Spentonwow.com/"/>
                <meta property="og:site_name" content="Spentonwow"/>
                <meta property="og:type" content="website"/>
                <meta property="og:locale" content="en_US"/>
            </Head>
            <div className={`${styles.root} ${big ? styles.big : ''}`} style={backgroundStyle}>
                {!isMobile && videoSupported && (
                    <video ref={videoRef} className={styles.backgroundVideo} muted disablePictureInPicture aria-hidden="true">
                        <source src="/videos/background.webm" type="video/webm" />
                    </video>
                )}
                <noscript>
                    <div className={styles.backgroundImageFallback}>
                        <img src="/images/background.webp" alt="Background" aria-hidden="true" />
                    </div>
                </noscript>
                <div className={styles.content}>
                    <Notification />
                    {children}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Layout;