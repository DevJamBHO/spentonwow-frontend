import React, { useEffect, useState } from 'react';
import styles from '@/styles/Dashboard.module.scss';
import useSpentStore from "@/store/useSpentStore";
import BurgerCard from "@/components/Dashboard/BurgerCard";
import FilmCard from "@/components/Dashboard/FilmCard";
import GoldCard from "@/components/Dashboard/GoldCard";

const CardList: React.FC = () => {
    useSpentStore(state => state.fetchSpentData);
    useSpentStore(state => state.amountInCurrentCurrency);
    const currency = useSpentStore(state => state.currency);

    const [localAmountEur, setLocalAmountEur] = useState<number>(0);
    const [localAmountUsd, setLocalAmountUsd] = useState<number>(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const currentAmountEur = useSpentStore.getState().amountEur;
            const currentAmountUsd = useSpentStore.getState().amountUsd;
            setLocalAmountEur(currentAmountEur);
            setLocalAmountUsd(currentAmountUsd);
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [useSpentStore.getState().amountEur, useSpentStore.getState().amountUsd]);

    const amountToUse = currency === 'USD' ? localAmountUsd : localAmountEur;

    return (
        <div className={styles.cardList}>
            <BurgerCard
                amountToUse={amountToUse}
                currency={currency}
            />
            <GoldCard
                amountToUse={amountToUse}
                currency={currency}
            />
            <FilmCard
                amountToUse={amountToUse}
                currency={currency}
            />
        </div>
    );
};

export default CardList;