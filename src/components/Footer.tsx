import React from 'react';
import styles from '@/styles/Footer.module.scss';
import { faXTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getLanguage, setLanguage} from "@/utils/language";
import {translate} from "@/utils/translate";

const Footer: React.FC = () => {
    const language = getLanguage()
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
                        <a href={`/${language}/legals`}>
                            {translate('footer.legalMention')}
                        </a>
                        <a href={`/${language}/confidentiality`}>
                            {translate('footer.confidentiality')}
                        </a>
                        <a href={`/${language}/cookies`}>
                            {translate('footer.cookies')}
                        </a>
                    </div>
                    <div className={styles.links}>
                        <a href="https://discord.gg/us4ySEdA2w"><FontAwesomeIcon icon={faDiscord}/>Discord</a>
                        <a href="https://x.com/sapling_toss"><FontAwesomeIcon icon={faXTwitter}/>X (twitter)</a>
                        <a href="mailto:support@wowchievement.com"><FontAwesomeIcon icon={faEnvelope}/>Mail</a>
                    </div>
                    <div className={styles.flags}>
                        <img
                            className={`${styles.flag} ${language === 'en' ? styles.active : ''}`}
                            src="/images/en_flag.webp"
                            alt="en"
                            height={20}
                            onClick={() => setLanguage('en')}
                        />
                        <img
                            className={`${styles.flag} ${language === 'fr' ? styles.active : ''}`}
                            src="/images/fr_flag.webp"
                            alt="fr"
                            height={20}
                            onClick={() => setLanguage('fr')}
                        />
                    </div>
                </div>
                <div className={styles.end}>
                    <div>
                        &copy; {new Date().getFullYear()}&nbsp;
                        <a href="https://sapling-toss.com/" target="_blank">Sapling-Toss</a>.
                        &nbsp;{translate('footer.reserved')}
                    </div>
                </div>
            </div>
            <svg style={{position: 'fixed', top: '100vh'}}>
                <defs>
                    <filter id="blob">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                                       result="blob"/>
                        <feComposite in="SourceGraphic" in2="blob" operator="atop" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default Footer;