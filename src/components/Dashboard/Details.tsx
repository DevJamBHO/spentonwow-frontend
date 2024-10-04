import React, { useState } from "react";
import useSpentStore from "@/store/useSpentStore";
import { formatCurrency } from "@/utils/formatCurrency";
import styles from '@/styles/Details.module.scss';
import { translate } from "@/utils/translate";

const Details: React.FC = () => {
    const extensionList = useSpentStore(state => state.extensions);
    const shopList = useSpentStore(state => state.shop);
    const currency = useSpentStore(state => state.currency);
    const subscription = useSpentStore(state => state.subscription);

    const [showNotOwned, setShowNotOwned] = useState(false);

    function getValueInCurrency(values: { dol: number, eur: number }) {
        return currency === 'USD' ? values.dol : values.eur;
    }

    function convertMonthsToYearsMonths(months: number) {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        return `${years > 0 ? translate('year', { count: years, count_singular: 'an', count_plural: 'ans' }) : ''} ${remainingMonths > 0 ? translate('month', { count: remainingMonths, count_singular: 'mois', count_plural: 'mois' }) : ''}`.trim();
    }

    const renderItems = (items: Array<spentDetail>) => {
        const ownedItems = items.filter(item => item.owned);
        const notOwnedItems = items.filter(item => !item.owned);

        return (
            <>
                {ownedItems.map((item, key) => (
                    <div className={styles['shop-item']} key={`${item.name}-${key}`}>
                        <div className={styles['item-name']}>
                            <div>{item.name}</div>
                        </div>
                        <div>
                            {formatCurrency(getValueInCurrency(item.cost), { currency })}
                        </div>
                    </div>
                ))}
                {notOwnedItems.length > 0 && (
                    <div>
                        {showNotOwned && (
                            <>
                                {notOwnedItems.map((item, key) => (
                                    <div className={styles['not-owned']} key={`${item.name}-${key}`}>
                                        <div className={styles['item-name']}>
                                            <div>{item.name} ({translate('notOwned')})</div>
                                        </div>
                                        <div>
                                            {formatCurrency(getValueInCurrency(item.cost), { currency })}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        <div className={styles['not-owned-count']} onClick={() => setShowNotOwned(!showNotOwned)}>
                            {showNotOwned ? translate('hideItems') : `(+ ${notOwnedItems.length} ${translate('showItems')})`}
                        </div>
                    </div>
                )}
            </>
        );
    };

    const getCombinedShopList = () => {
        return [...(shopList.mount || []), ...(shopList.pet || [])];
    }

    return (
        <div className={styles.details}>
            <div>
                <p>{translate('subscription')} :</p>
                <div className={styles.subscription}>
                    <div className={styles['subscription-item']}>
                        <div>{convertMonthsToYearsMonths(subscription.estimated_months)}</div>
                        <div>{formatCurrency(getValueInCurrency(subscription.estimated_cost), { currency })}</div>
                    </div>
                </div>
            </div>
            <div>
                <p>{translate('extensions')} :</p>
                <div className={styles.extensions}>
                    {extensionList?.length > 0 && renderItems(extensionList)}
                </div>
            </div>
            <div>
                <p>{translate('shop')} :</p>
                <div className={styles.shop}>
                    {renderItems(getCombinedShopList())}
                </div>
            </div>
        </div>
    )
};

export default Details;