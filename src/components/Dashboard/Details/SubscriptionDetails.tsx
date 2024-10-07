import React from 'react';
import { formatCurrency } from '@/utils/formatCurrency';
import styles from '@/styles/Details.module.scss';
import { translate } from '@/utils/translate';

interface SubscriptionDetailsProps {
    subscription: { estimated_months: number, estimated_cost: { dol: number, eur: number } };
    currency: string;
    getValueInCurrency: (values: { dol: number, eur: number }) => number;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({ subscription, currency, getValueInCurrency }) => {
    function convertMonthsToYearsMonths(months: number): string {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        return `${years > 0 ? translate('year', { count: years }) : ''} ${remainingMonths > 0 ? translate('month', { count: remainingMonths }) : ''}`.trim();
    }

    return (
        <div>
            <p>{translate('subscription')} :</p>
            <div className={styles.subscription}>
                <div className={styles['subscription-item']}>
                    <div>{convertMonthsToYearsMonths(subscription.estimated_months)}</div>
                    <div>{formatCurrency(getValueInCurrency(subscription.estimated_cost), { currency })}</div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionDetails;