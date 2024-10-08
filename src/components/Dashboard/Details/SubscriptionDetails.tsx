// components/SubscriptionDetails.tsx
import React, { useState } from 'react';
import { formatCurrency } from '@/utils/formatCurrency';
import styles from '@/styles/Details.module.scss';
import { translate } from '@/utils/translate';

interface SubscriptionPeriod {
    start_date: string;
    end_date: string;
    months: number;
}

interface SubscriptionDetailsProps {
    subscription: {
        estimated_months: number;
        estimated_cost: { dol: number; eur: number };
        periods: SubscriptionPeriod[];
    };
    currency: string;
    getValueInCurrency: (values: { dol: number; eur: number }) => number;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({ subscription, currency, getValueInCurrency }) => {
    const [showDetails, setShowDetails] = useState(false);

    const convertMonthsToYearsMonths = (months: number): string => {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        return `${years > 0 ? translate('year', { count: years }) : ''} ${remainingMonths > 0 ? translate('month', { count: remainingMonths }) : ''}`.trim();
    };

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', options);
    };

    const handleToggleDetails = () => setShowDetails(!showDetails);

    return (
        <div>
            <p>{translate('subscription')} :</p>
            <div className={styles.subscription}>
                <div className={styles['subscription-item']}>
                    <div>{convertMonthsToYearsMonths(subscription.estimated_months)}</div>
                    <div>{formatCurrency(getValueInCurrency(subscription.estimated_cost), {currency})}</div>
                </div>
                {showDetails && (
                    <div className={styles['subscription-periods']}>
                        {subscription.periods.map((period, index) => (
                            <div key={index} className={styles['subscription-period']}>
                                <div
                                    className={styles['period-date']}>{formatDate(period.start_date)} - {formatDate(period.end_date)}</div>
                                <div
                                    className={styles['period-length']}>{convertMonthsToYearsMonths(period.months)}</div>
                            </div>
                        ))}
                    </div>
                )}
                <div className={styles['not-owned-count']} onClick={handleToggleDetails}>
                    {showDetails ? translate('hideDetails') : translate('showDetails')}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionDetails;