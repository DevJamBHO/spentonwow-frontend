// #file: components/Wowchievement.tsx
import React from "react";
import styles from "@/styles/SubContainer.module.scss";
import { translate } from "@/utils/translate";
import { getLanguage } from "@/utils/language";

interface WowRecapProps {
    region: string;
    server: string;
    character: string;
}

const WowRecap: React.FC<WowRecapProps> = ({ region, server, character }) => {
    const href = `https://wow-recap.com/${getLanguage()}/dashboard?region=${region}&server=${server}&character=${character}/lang=${getLanguage()}`;

    return (
        <div className={styles.shareComponent}>
            <h1 className={styles.shareTitle}>
                <img alt="WoW Recap logo" src="/images/wowrecap.webp" width="35" height="35" />
                {translate('wowrecap.title')}
            </h1>
            <p className={styles.shareDescription}>
                {translate('wowrecap.question1')}&nbsp;
            </p>
            <p className={styles.shareDescription}>
                <a href={href} target="_blank">WoW-Recap.com</a>&nbsp;
            </p>
        </div>
    );
};

export default WowRecap;