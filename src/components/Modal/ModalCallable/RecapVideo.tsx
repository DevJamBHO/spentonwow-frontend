import React, { useEffect, useState } from 'react';
import VideoWrapper from "@/components/VideoWrapper";
import styles from '@/styles/Video.module.scss';

const RecapVideo: React.FC = () => {
    const texts = [
        "Partez à l'aventure !",
        "Découvrez Azeroth",
        "Vainquez vos ennemis",
        "Rejoignez votre guilde",
        "Forgez votre destinée"
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 4500);

        return () => clearInterval(interval);
    }, [texts.length]);

    return (
        <VideoWrapper animationDuration={24000}>
            <div id="recap-video" className={styles.container}>
                <div className={styles.gameboy}>
                    <div className={styles.screen}>
                        <div className={styles.inner}>
                            {texts.map((text, i) => {
                                let className = '';

                                if (i === index) {
                                    className = styles.visible; // Texte entrant
                                } else if (i === (index - 1 + texts.length) % texts.length) {
                                    className = styles.scrollOut; // Texte sortant
                                }

                                return (
                                    <p key={i} className={`${styles.text} ${className}`}>{text}</p>
                                );
                            })}
                        </div>
                        <div className={styles.top}>
                            <div className={styles.power}></div>
                            <div className={styles.engraved}>spentonwow.com</div>
                        </div>
                    </div>
                </div>
            </div>
        </VideoWrapper>
    );
};

export default RecapVideo;