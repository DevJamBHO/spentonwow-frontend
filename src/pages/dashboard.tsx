import React, { useState, useEffect } from 'react';
import Layout from '@/layouts/Layout';
import Container from '@/components/Container';
import Select from '@/components/Select';
import { convertMoneyToGold } from '@/utils/conversion';
import { films, Film } from '@/constants/films';
import styles from '@/styles/Dashboard.module.scss';
import Card from '@/components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger, faCoins, faFilm, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency, formatGold } from '@/utils/formatCurrency';
import { translate } from '@/utils/translate';
import { detectLanguage, setLanguage } from '@/utils/language';

const Dashboard: React.FC = () => {
    const [currency, setCurrency] = useState<string>('EUR');
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        const lang = detectLanguage();
        setLanguage(lang);
        setIsClient(true);
    }, []);

    const amountInEuros = 500;

    const [selectedFilm, setSelectedFilm] = useState<Film>(films[0]);

    useEffect(() => {
        const randomFilm = films[Math.floor(Math.random() * films.length)];
        setSelectedFilm(randomFilm);
    }, []);

    const formatAmount = (amount: number, currency: string) => {
        const locale = currency === 'USD' ? 'en-US' : 'fr-FR';
        return formatCurrency(amount, { currency, locale });
    };

    const calculateBigMacIndex = (amount: number, currency: string) => {
        const bigMacPrice = currency === 'USD' ? 5.65 : 4.30;
        return (amount / bigMacPrice).toFixed(2);
    };

    const calculateFilmEquivalent = (amount: number, currency: string, film: Film) => {
        const costInEUR = film.price / (currency === 'USD' ? 1.2 : 1);
        const percentage = ((amount / costInEUR) * 100).toFixed(6);
        return `${percentage} ${translate('ofProductionCost')} ${film.name}`;
    };

    const goldEquivalent = convertMoneyToGold(amountInEuros, currency).toFixed(2);
    const formattedGold = formatGold(parseFloat(goldEquivalent)); // Convert gold to copper representation

    const currencyOptions = [
        { value: 'EUR', label: '€ Euros' },
        { value: 'USD', label: '$ Dollars' },
    ];

    if (!isClient) {
        return null; // or a loading spinner, placeholder text, etc.
    }

    return (
        <Layout big>
            <div className={styles.dashboardLayout}>
                <Container className={styles.mainContainer}>
                    <div className={styles.headerContainer}>
                        <h1 className={styles.siteName}>{translate('siteName')}</h1>
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
                            <FontAwesomeIcon icon={faMoneyBillWave} className={styles.amountTitleIcon}/>
                            {translate('amountSpentSince')}
                        </div>
                        <div className={styles.amount}>
                            <span>{formatAmount(amountInEuros, currency)}</span>
                        </div>
                        <div className={styles.amountDetails}>
                            <Card
                                icon={faHamburger}
                                title={translate('bigMacEquivalent')}
                                value={calculateBigMacIndex(amountInEuros, currency)}
                                description={`${translate('bigMacPriceInfo')} (${formatAmount(4.30, currency)})`}
                            />
                            <Card
                                icon={faCoins}
                                title={translate('goldCoinsEquivalent')}
                                value={formattedGold}
                                description={`${translate('amountSpentSince')} ${formatAmount(amountInEuros, currency)} en pièces d'or WoW`}
                            />
                            <Card
                                icon={faFilm}
                                title={translate('filmProductionCost')}
                                value={calculateFilmEquivalent(amountInEuros, currency, selectedFilm)}
                                description={`${translate('ofProductionCost')} ${selectedFilm.name} (${formatAmount(selectedFilm.price, currency)})`}
                            />
                        </div>
                    </div>
                </Container>
                <div className={styles.sideContainers}>
                    <Container className={styles.sideContainer}>
                        {translate('publicity')}
                    </Container>
                    <Container className={styles.sideContainer}>
                        <h2>TODO</h2>
                    </Container>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;