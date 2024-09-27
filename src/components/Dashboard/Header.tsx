import React from 'react';
import Select from '@/components/Select';
import styles from '@/styles/Dashboard.module.scss';
import { translate } from '@/utils/translate';
import useSpentStore from '@/store/useSpentStore';

type Currency = 'EUR' | 'USD';

const Header: React.FC = () => {
    const currency = useSpentStore(state => state.currency);
    const setCurrency = useSpentStore(state => state.setCurrency);

    const currencyOptions = [
        { value: 'EUR', label: '€ Euros' },
        { value: 'USD', label: '$ Dollars' },
    ];

    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.siteName}>{translate('siteName')}</h1>
            <Select
                id="currency-select"
                value={currency}
                onChange={setCurrency} // Cast String to Currency
                options={currencyOptions}
                className={styles.currencySelect}
                hideLabel={true}
                small={true}
            />
        </div>
    );
};

export default Header;