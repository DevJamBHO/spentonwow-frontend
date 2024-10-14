import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import styles from "@/styles/SubContainer.module.scss";
import { formatCurrency } from "@/utils/formatCurrency";
import useSpentStore from "@/store/useSpentStore";
import { translate } from "@/utils/translate";
import ModalManager from "@/components/Modal/ModalManager";
import {useModal} from "@/context/ModalContext";

interface ShareProps {
    initialAmountEur: number;
    initialAmountUsd: number;
}

const Share: React.FC<ShareProps> = ({ initialAmountEur, initialAmountUsd }) => {
    const currency = useSpentStore(state => state.currency);

    const [localAmountEur, setLocalAmountEur] = useState<number>(initialAmountEur);
    const [localAmountUsd, setLocalAmountUsd] = useState<number>(initialAmountUsd);
    const amountToUse = currency === 'USD' ? localAmountUsd : localAmountEur;
    const { openModal } = useModal();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLocalAmountEur(useSpentStore.getState().amountEur || initialAmountEur);
            setLocalAmountUsd(useSpentStore.getState().amountUsd || initialAmountUsd);
        }, 100);

        return () => clearInterval(intervalId);
    }, [amountToUse, initialAmountEur, initialAmountUsd]);

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
                    <FontAwesomeIcon icon={faXTwitter}/>
                </a>

                <FontAwesomeIcon onClick={() => openModal('RecapVideo', 'Partager sur Instagram')} icon={faInstagram} className={styles.icon}/>
                <FontAwesomeIcon onClick={() => openModal('RecapVideo', 'Partager sur TikTok')} icon={faTiktok} className={styles.icon}/>
                <ModalManager/>
            </div>
        </div>
    );
};

export default Share;