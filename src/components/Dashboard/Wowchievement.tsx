import React from "react";import styles from "@/styles/SubContainer.module.scss";
import {translate} from "@/utils/translate";
import { getLanguage } from "@/utils/language";


const Share: React.FC = () => {

    const queryParameters = new URLSearchParams(window.location.search)
    const href = `https://wowchievement.com/${getLanguage()}/renown?region=${queryParameters.get('region')}&server%5B0%5D=${queryParameters.get('server')}&character%5B0%5D=${queryParameters.get('character')}`

    return (
        <div className={styles.shareComponent}>
            <h1 className={styles.shareTitle}>
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

export default Share;