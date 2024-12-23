import React from "react";
import styles from '@/styles/FakePieChart.module.scss';
import {translate} from "@/utils/translate";
import {faGhost} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FakePieChart: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.fakeContent}>
                <div className={styles.fakePie}></div>
                <div className={styles.fakeText}></div>
                <div className={styles.fakeText}></div>
                <div className={styles.fakeText}></div>
            </div>
            <div className={styles.message}>
                <FontAwesomeIcon icon={faGhost} width="35" height="35"/>
                <p>{translate('removeAdblockPie')}</p>
                <a target="_blank" href='https://sapling-toss.com/blog/why-ads/'>{translate('removeAdblockLink')}</a>
            </div>
        </div>
    );
};

export default FakePieChart;