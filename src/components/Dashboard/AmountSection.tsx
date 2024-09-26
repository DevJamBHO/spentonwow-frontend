import React from 'react';
import styles from '@/styles/Dashboard.module.scss';
import { translate } from '@/utils/translate';
import {formatCurrency} from "@/utils/formatCurrency";
import useSpentStore from "@/store/useSpentStore";

interface AmountSectionProps {
    amountInEuros: number;
}

const AmountSection: React.FC<AmountSectionProps> = ({amountInEuros}) => {
    const currency = useSpentStore(state => state.currency);

    return (
        <div className={styles.amountSection}>
            <div className={styles.amountTitle}>
                {translate('amountSpentSince')}&nbsp;{formatCurrency(amountInEuros, { currency })}
            </div>
        </div>
    );
};

export default AmountSection;