import React from "react";
import styles from '@/styles/FakeDetails.module.scss';
import { translate } from "@/utils/translate";
import {faGhost} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FakeDetails: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.detailsBlurred}>
                <div>
                    <p>{translate('subscription')}</p>
                    <div className={styles.subscription}>
                        <div className={styles['subscription-item']} />
                        <div className={styles['subscription-item']} />
                    </div>
                </div>
                <div>
                    <p>{translate('extensions')}</p>
                    <div className={styles.extensions}>
                        <div className={styles['shop-item']} />
                        <div className={styles['shop-item']} />
                        <div className={styles['shop-item']} />
                    </div>
                </div>
                <div>
                    <p>{translate('shop')}</p>
                    <div className={styles.shop}>
                        <div className={styles['shop-item']} />
                        <div className={styles['shop-item']} />
                        <div className={styles['shop-item']} />
                    </div>
                </div>
            </div>
            <div className={styles.warning}>
                <p>
                    {translate('removeAdblock')}
                    &nbsp;<FontAwesomeIcon icon={faGhost} />
                </p>
            </div>
        </div>
    );
};

export default FakeDetails;