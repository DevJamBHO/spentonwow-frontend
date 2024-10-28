import React from 'react';
import styles from '@/styles/Footer.module.scss';

const Footer: React.FC = () => {
    const bubbles = Array.from({ length: 128 }, (_, i) => (
        <div
            key={i}
            className={styles.bubble}
            style={{
                '--size': `${2 + Math.random() * 4}rem`,
                '--distance': `${10 + Math.random() * 4}rem`,
                '--position': `${5 + Math.random() * 90}%`,
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
                <div className={styles.contentBody}>
                    <div>
                        spentonwow@gmail.com
                    </div>
                    <div>
                        <a href="/legals">
                            Mentions légales
                        </a>
                        <a href="/confidentiality">
                            Politique de confidentialité
                        </a>
                        <a href="/cookies">
                            Politique de cookies
                        </a>
                    </div>
                </div>
                <div className={styles.end}>
                    <div>&copy; {new Date().getFullYear()} <a href="https://saplingtoss.com" target="_blank">Sapling-Toss</a>. Tous droits réservés.</div>
                </div>
            </div>
            <svg style={{position: 'fixed', top: '100vh'}}>
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