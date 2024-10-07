// #file: Details.tsx
import React, {useState, FC} from "react";
import useSpentStore, {Cost, SpentDetail} from "@/store/useSpentStore";
import {formatCurrency} from "@/utils/formatCurrency";
import styles from '@/styles/Details.module.scss';
import {translate} from "@/utils/translate";

const Details: FC = () => {
    const extensionList = useSpentStore(state => state.extensions);
    const shop = useSpentStore(state => state.shop);
    const shopList = getCombinedShopList(shop);
    const currency = useSpentStore(state => state.currency);
    const subscription = useSpentStore(state => state.subscription);

    const [showExtensionNotOwned, setShowExtensionNotOwned] = useState(false);
    const [showShopNotOwned, setShowShopNotOwned] = useState(false);

    function getCombinedShopList(shop: { mounts: SpentDetail[]; pets: SpentDetail[] }): SpentDetail[] {
        return [...(shop.mounts || []), ...(shop.pets || [])];
    }

    function getValueInCurrency(values: Cost): number {
        return currency === 'USD' ? values.dol : values.eur;
    }

    function convertMonthsToYearsMonths(months: number): string {
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        return `${years > 0 ? translate('year', {count: years}) : ''} ${remainingMonths > 0 ? translate('month', {count: remainingMonths}) : ''}`.trim();
    }

    function renderItem(item: SpentDetail, key: number, showNotOwned: boolean) {
        if (item.Versions) {
            const allNotOwnedVersions = item.Versions.filter(version => !version.owned);

            return (
                <React.Fragment key={`${item.name}-${key}`}>
                    {item.Versions.filter(version => version.owned).map((ownedVersion, verKey) => (
                        <div className={styles['shop-item']} key={`${item.name}-${ownedVersion.edition}-${verKey}`}>
                            <div className={styles['item-name']}>
                                <div>{`${item.name} - ${ownedVersion.edition}`}</div>
                            </div>
                            <div>
                                {formatCurrency(getValueInCurrency(ownedVersion.cost), {currency})}
                            </div>
                        </div>
                    ))}
                    {showNotOwned && allNotOwnedVersions.length > 0 && (
                        <div>
                            {allNotOwnedVersions.map((version, index) => (
                                <div className={styles['not-owned']} key={`${item.name}-${version.edition}-${index}`}>
                                    <div className={styles['item-name']}>
                                        <div>{`${item.name} - ${version.edition}`} ({translate('notOwned')})</div>
                                    </div>
                                    <div>
                                        {formatCurrency(getValueInCurrency(version.cost), {currency})}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment key={`${item.name}-${key}`}>
                    {item.owned && (
                        <div className={styles['shop-item']}>
                            <div className={styles['item-name']}>
                                <div>{item.name}</div>
                            </div>
                            <div>
                                {formatCurrency(getValueInCurrency(item.cost), {currency})}
                            </div>
                        </div>
                    )}
                    {showNotOwned && !item.owned && (
                        <div className={styles['not-owned']}>
                            <div className={styles['item-name']}>
                                <div>{item.name} ({translate('notOwned')})</div>
                            </div>
                            <div>
                                {formatCurrency(getValueInCurrency(item.cost), {currency})}
                            </div>
                        </div>
                    )}
                </React.Fragment>
            );
        }
    }

    const renderItems = (items: SpentDetail[], showNotOwned: boolean, toggleShowNotOwned: () => void) => {
        const ownedItems = items.filter(item => item.owned);
        const nonOwnedItems = items.filter(item => !item.owned);

        return (
            <>
                {items.map((item, key) => (
                    item.Versions
                        ? renderItem(item, key, showNotOwned)
                        : item.owned || showNotOwned
                            ? renderItem(item, key, showNotOwned)
                            : null
                ))}
                {nonOwnedItems.length > 0 && (
                    <div className={styles['not-owned-count']} onClick={toggleShowNotOwned}>
                        {showNotOwned ? translate('hideItems') : `(+ ${nonOwnedItems.length} ${translate('showItems')})`}
                    </div>
                )}
            </>
        );
    };

    const countOwnedItems = (items: SpentDetail[]): number => {
        return items.reduce((count, item) => {
            if (item.owned) {
                count += 1;
            }
            if (item.Versions) {
                count += item.Versions.filter(version => version.owned).length;
            }
            return count;
        }, 0);
    };

    return (
        <div className={styles.details}>
            <div>
                <p>{translate('subscription')} :</p>
                <div className={styles.subscription}>
                    <div className={styles['subscription-item']}>
                        <div>{convertMonthsToYearsMonths(subscription.estimated_months)}</div>
                        <div>{formatCurrency(getValueInCurrency(subscription.estimated_cost), {currency})}</div>
                    </div>
                </div>
            </div>
            <div>
                <p>{translate('extensions')} ({translate('owned', {count: countOwnedItems(extensionList)})}) :</p>
                <div className={styles.extensions}>
                    {extensionList?.length > 0 && renderItems(extensionList, showExtensionNotOwned, () => setShowExtensionNotOwned(!showExtensionNotOwned))}
                </div>
            </div>
            <div>
                <p>{translate('shop')} ({translate('owned', {count: countOwnedItems(shopList)})}) :</p>
                <div className={styles.shop}>
                    {shopList?.length > 0 && renderItems(shopList, showShopNotOwned, () => setShowShopNotOwned(!showShopNotOwned))}
                </div>
            </div>
        </div>
    );
};

export default Details;