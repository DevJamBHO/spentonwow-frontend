import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import styles from '@/styles/Dashboard.module.scss';
import { faHamburger, faCoins, faFilm } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency, formatGold } from '@/utils/formatCurrency';
import { translate } from '@/utils/translate';
import { Film, films } from '@/constants/films';
import useSpentStore from "@/store/useSpentStore";

interface CardListProps {
    amountInEuros: number;
}

const CardList: React.FC<CardListProps> = ({ amountInEuros }) => {
    const goldEquivalent = useSpentStore(state => state.goldEquivalent);
    const currency = useSpentStore(state => state.currency);

    const [delayedGoldEquivalent, setDelayedGoldEquivalent] = useState<number>(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (goldEquivalent !== 0) {
                setDelayedGoldEquivalent(goldEquivalent);
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [goldEquivalent]);

    const calculateBigMacIndex = (amount: number) => {
        const bigMacPrice = currency === 'USD' ? 5.65 : 4.30;
        return (amount / bigMacPrice).toFixed(2);
    };

    const calculateFilmEquivalent = (amount: number, film: Film) => {
        const costInEUR = film.price / (currency === 'USD' ? 1.2 : 1);
        const percentage = ((amount / costInEUR) * 100).toFixed(6);
        return `${percentage} ${translate('ofProductionCost')} ${film.name}`;
    };

    const [selectedFilm, setSelectedFilm] = useState<Film>(films[0]);
    useEffect(() => {
        const randomFilm = films[Math.floor(Math.random() * films.length)];
        setSelectedFilm(randomFilm);
    }, []);

    return (
        <div className={styles.cardList}>
            <Card
                icon={faHamburger}
                title={translate('bigMacEquivalent')}
                value={`${calculateBigMacIndex(amountInEuros)} Big Macs`}
                description={`${translate('bigMacPriceInfo')} (${formatCurrency(4.30, { currency })})`}
            />
            <Card
                icon={faCoins}
                title={translate('goldCoinsEquivalent')}
                value={formatGold(delayedGoldEquivalent)}
                description={`${translate('amountSpentSince')} ${formatCurrency(amountInEuros, { currency })} en pièces d'or WoW`}
            />
            <Card
                icon={faFilm}
                title={translate('filmProductionCost')}
                value={calculateFilmEquivalent(amountInEuros, selectedFilm)}
                description={`${translate('ofProductionCost')} ${selectedFilm.name} (${formatCurrency(selectedFilm.price, { currency })})`}
            />
        </div>
    );
};

export default CardList;