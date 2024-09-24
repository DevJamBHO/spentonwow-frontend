import React, { useState, useEffect } from 'react';
import Layout from '@/layouts/Layout';
import Container from '@/components/Container';
import Select from '@/components/Select';
import { convertMoneyToGold } from '@/utils/conversion';
import { films, Film } from '@/constants/films';
import styles from '@/styles/Dashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faCoins, faFilm, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

const Dashboard: React.FC = () => {
    const [currency, setCurrency] = useState<string>('EUR');
    const siteName = 'Mon Site';
    const amountInEuros = 500;

    const [selectedFilm, setSelectedFilm] = useState<Film>(films[0]);

    useEffect(() => {
        const randomFilm = films[Math.floor(Math.random() * films.length)];
        setSelectedFilm(randomFilm);
    }, []);

    const formatAmount = (amount: number, currency: string) => {
        if (currency === 'USD') {
            return (amount * 1.2).toFixed(2);
        }
        return amount.toFixed(2);
    };

    const calculateBigMacIndex = (amount: number, currency: string) => {
        const bigMacPrice = currency === 'USD' ? 5.65 : 4.30;
        return (amount / bigMacPrice).toFixed(2);
    };

    const calculateFilmEquivalent = (amount: number, currency: string, film: Film) => {
        const costInEUR = film.price / (currency === 'USD' ? 1.2 : 1);
        const percentage = ((amount / costInEUR) * 100).toFixed(6);
        return `${percentage}% du coût de production de ${film.name}`;
    };

    const goldEquivalent = convertMoneyToGold(amountInEuros, currency);

    const currencyOptions = [
        { value: 'EUR', label: '€ Euros' },
        { value: 'USD', label: '$ Dollars' },
    ];

    return (
        <Layout big>
            <div className={styles.dashboardLayout}>
                <Container className={styles.mainContainer}>
                    <div className={styles.headerContainer}>
                        <h1 className={styles.siteName}>{siteName}</h1>
                        <Select
                            id="currency-select"
                            value={currency}
                            onChange={setCurrency}
                            options={currencyOptions}
                            className={styles.currencySelect}
                            hideLabel={true}
                            small={true}
                        />
                    </div>
                    <div className={styles.amountSection}>
                        <div className={styles.amountTitle}>
                            <FontAwesomeIcon icon={faMoneyBillWave} className={styles.amountTitleIcon} />
                            Depuis 2004, vous avez dépensé :
                        </div>
                        <div className={styles.amount}>
                            <span>{formatAmount(amountInEuros, currency)}</span>
                            <span>{currency}</span>
                        </div>
                        <div className={styles.amountDetails}>
                            <div className={styles.card}>
                                <FontAwesomeIcon icon={faHamburger} className={styles.cardIcon} />
                                <div className={styles.cardTitle}>Equivalent Big Macs</div>
                                <div className={styles.cardValue}>{calculateBigMacIndex(amountInEuros, currency)}</div>
                            </div>
                            <div className={styles.card}>
                                <FontAwesomeIcon icon={faCoins} className={styles.cardIcon} />
                                <div className={styles.cardTitle}>Pièces d'or</div>
                                <div className={styles.cardValue}>{goldEquivalent.toFixed(2)}</div>
                            </div>
                            <div className={styles.card}>
                                <FontAwesomeIcon icon={faFilm} className={styles.cardIcon} />
                                <div className={styles.cardTitle}>Coût de production film</div>
                                <div className={styles.cardValue}>{calculateFilmEquivalent(amountInEuros, currency, selectedFilm)}</div>
                            </div>
                        </div>
                    </div>
                </Container>
                <div className={styles.sideContainers}>
                    <Container className={styles.sideContainer}>
                        Placer publicité ici
                    </Container>
                    <Container className={styles.sideContainer}>
                        <h2>Section Droite 2</h2>
                    </Container>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;