import React, { useState } from 'react';
import { SpentDetail, Cost } from '@/store/useSpentStore';
import ItemDetails from './ItemDetails';
import styles from '@/styles/Details.module.scss';
import { translate } from '@/utils/translate';

interface ShopDetailsProps {
    shopList: SpentDetail[];
    currency: string;
    getValueInCurrency: (values: Cost) => number;
    title: string
}

const ShopDetails: React.FC<ShopDetailsProps> = ({ shopList, currency, getValueInCurrency, title }) => {
    const [showShopNotOwned, setShowShopNotOwned] = useState(false);

    const countOwnedItems = (items: SpentDetail[]): number => {
        return items.reduce((count, item) => {
            if (item.owned) {
                count += 1;
            }
            if (item.versions) {
                count += item.versions.filter(version => version.owned).length;
            }
            return count;
        }, 0);
    };

    return (
        <div>
            <p>{translate(title)} ({translate('owned', {count: countOwnedItems(shopList)})}) :</p>
            <div className={styles.shop}>
                {shopList?.length > 0 && shopList.map((item, key) => (
                    <ItemDetails key={`shop-${key}`} item={item} keyIndex={key} showNotOwned={showShopNotOwned} getValueInCurrency={getValueInCurrency} currency={currency} />
                ))}
                {shopList.filter(item => !item.owned).length > 0 && (
                    <div className={styles['not-owned-count']} onClick={() => setShowShopNotOwned(!showShopNotOwned)}>
                        {showShopNotOwned ? translate('hideItems') : `(+ ${shopList.filter(item => !item.owned).length} ${translate('showItems')})`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopDetails;