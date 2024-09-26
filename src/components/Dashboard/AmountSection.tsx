import React, { useEffect, useState } from 'react';
import styles from '@/styles/Dashboard.module.scss';
import { translate } from '@/utils/translate';
import { formatCurrency } from "@/utils/formatCurrency";
import useSpentStore from "@/store/useSpentStore";

const AmountSection: React.FC = () => {
    const currency = useSpentStore(state => state.currency);
    useSpentStore(state => state.amountInCurrentCurrency);

    const [localAmountEur, setLocalAmountEur] = useState<number>(0);
    const [localAmountUsd, setLocalAmountUsd] = useState<number>(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLocalAmountEur(useSpentStore.getState().amountEur);
            setLocalAmountUsd(useSpentStore.getState().amountUsd);
        }, 100); // Delay to ensure state is updated

        return () => clearTimeout(timeoutId);
    }, [useSpentStore.getState().amountEur, useSpentStore.getState().amountUsd]);

    const amountToUse = currency === 'USD' ? localAmountUsd : localAmountEur;

    useEffect(() => {
    }, [localAmountEur, localAmountUsd]);

    return (
        <div className={styles.amountSection}>
            <div className={styles.amountTitle}>
                {translate('amountSpentSince')}&nbsp;{formatCurrency(amountToUse, { currency })}
            </div>
        </div>
    );
};

export default AmountSection;