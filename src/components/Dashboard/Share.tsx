import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faDiscord, faReddit } from "@fortawesome/free-brands-svg-icons";
import styles from "@/styles/SubContainer.module.scss";
import { formatCurrency } from "@/utils/formatCurrency";
import useSpentStore from "@/store/useSpentStore";
import {translate} from "@/utils/translate";

const Share: React.FC = () => {
    const currency = useSpentStore(state => state.currency);

    const [localAmountEur, setLocalAmountEur] = useState<number>(0);
    const [localAmountUsd, setLocalAmountUsd] = useState<number>(0);
    const amountToUse = currency === 'USD' ? localAmountUsd : localAmountEur;

    useEffect(() => {
        if (amountToUse === 0) {
            const intervalId = setInterval(() => {
                setLocalAmountEur(useSpentStore.getState().amountEur);
                setLocalAmountUsd(useSpentStore.getState().amountUsd);
            }, 100);

            return () => clearInterval(intervalId);
        }
    }, [amountToUse]);

    const tweetMessage = encodeURIComponent(
        `${translate('share.twitter1')} ${formatCurrency(amountToUse, { currency })} ${translate('share.twitter2')} 💰⚔️ #SpentOnWow #RaidBrag #WoW`
    );

    return (
        <div className={styles.shareComponent}>
            <h1 className={styles.shareTitle}>
                {translate('share.title')}
            </h1>
            <p className={styles.shareDescription}>
                {translate('share.question')}
            </p>
            <div className={styles.iconContainer}>
                <a
                    href={`https://twitter.com/intent/tweet?text=${tweetMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.icon}
                    aria-label="Twitter"
                >
                    <FontAwesomeIcon icon={faXTwitter} />
                </a>
                <FontAwesomeIcon icon={faDiscord} className={styles.icon} />
                <FontAwesomeIcon icon={faReddit} className={styles.icon} />
            </div>
        </div>
    );
};

export default Share;