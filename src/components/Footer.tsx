import React from 'react';
import styles from '@/styles/Footer.module.scss';

const Footer: React.FC = () => {
    const bubbles = Array.from({ length: 128 }, (_, i) => (
        <div
            key={i}
            className={styles.bubble}
            style={{
                '--size': `${2 + Math.random() * 4}rem`,
                '--distance': `${6 + Math.random() * 4}rem`,
                '--position': `${-5 + Math.random() * 110}%`,
                '--time': `${2 + Math.random() * 2}s`,
                '--delay': `${-1 * (2 + Math.random() * 2)}s`,
            } as React.CSSProperties}
        ></div>
    ));

    return (
        <div className={styles.footer}>
            <div className={styles.bubbles}>
                {bubbles}
            </div>
            <div className={styles.content}>
                <div>
                    COUCOU
                </div>
            </div>
            <svg style={{ position: 'fixed', top: '100vh' }}>
                <defs>
                    <filter id="blob">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob" />
                        <feComposite in="SourceGraphic" in2="blob" operator="atop" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default Footer;