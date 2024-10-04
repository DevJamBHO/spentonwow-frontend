import React, { useEffect, useState } from 'react';
import styles from '@/styles/Dashboard.module.scss';
import { translate } from '@/utils/translate';
import { formatCurrency } from "@/utils/formatCurrency";
import useSpentStore from "@/store/useSpentStore";
import Loading from "@/components/Loading";

const AmountSection: React.FC = () => {
    const currency = useSpentStore(state => state.currency);
    useSpentStore(state => state.amountInCurrentCurrency);

    const [localAmountEur, setLocalAmountEur] = useState<number>(0);
    const [localAmountUsd, setLocalAmountUsd] = useState<number>(0);

    // Hook for updating local amounts
    useEffect(() => {
        const updateAmounts = () => {
            setLocalAmountEur(useSpentStore.getState().amountEur);
            setLocalAmountUsd(useSpentStore.getState().amountUsd);
        };

        const timeoutId = setTimeout(updateAmounts, 100); // Initial delay to ensure state is updated

        return () => clearTimeout(timeoutId);
    }, [useSpentStore.getState().amountEur, useSpentStore.getState().amountUsd]);

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

    return (
        <div className={styles.amountSection}>
            <div className={styles.amountTitle}>
                {translate('amountSpentSince')}&nbsp;<span className={styles.price}>{formatCurrency(amountToUse, { currency })}</span>
            </div>
        </div>
    );
};

export default AmountSection;