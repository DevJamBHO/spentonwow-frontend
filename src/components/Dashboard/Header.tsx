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
            <a className={styles.siteName} href="/">
                <img alt="Wowspent logo" src="/images/logo.webp" width="35" height="35"/>
                {translate('siteName')}
            </a>
            <Select
                id="currency-select"
                value={currency}
                onChange={(value: string) => setCurrency(value as Currency)}
                options={currencyOptions}
                className={styles.currencySelect}
                hideLabel={true}
                small={true}
            />
        </div>
    );
};

export default Header;