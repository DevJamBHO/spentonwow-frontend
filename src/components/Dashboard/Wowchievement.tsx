// #file: components/Wowchievement.tsx
import React from "react";
import styles from "@/styles/SubContainer.module.scss";
import {translate} from "@/utils/translate";
import { getLanguage } from "@/utils/language";

interface WowchievementProps {
    region: string;
    server: string;
    character: string;
}

const Wowchievement: React.FC<WowchievementProps> = ({ region, server, character }) => {
    const href = `https://wowchievement.com/${getLanguage()}/renown?region=${region}&server%5B0%5D=${server}&character%5B0%5D=${character}`;

    return (
        <div className={styles.shareComponent}>
            <h1 className={styles.shareTitle}>
                <img alt="Wowchievement logo" src="/images/wowchievement.webp" width="35" height="35" />
                {translate('wowchievement.title')}
            </h1>
            <p className={styles.shareDescription}>
                {translate('wowchievement.question1')}&nbsp;
                <a href={href} target="_blank">wowchievement.com</a>&nbsp;
                {translate('wowchievement.question2')}
            </p>
        </div>
    );
};

export default Wowchievement;