import React, { FC } from "react";
import useSpentStore, {Cost, SpentDetail} from "@/store/useSpentStore";
import styles from '@/styles/Details.module.scss';

import SubscriptionDetails from '@/components/Dashboard/Details/SubscriptionDetails';
import ExtensionDetails from '@/components/Dashboard/Details/ExtensionDetails';
import ShopDetails from '@/components/Dashboard/Details/ShopDetails';

const Details: FC = () => {
    const extensionList = useSpentStore(state => state.extensions);
    const shop = useSpentStore(state => state.shop);
    const currency = useSpentStore(state => state.currency);
    const subscription = useSpentStore(state => state.subscription);

    const getCombinedShopList = (shop: { mounts: SpentDetail[]; pets: SpentDetail[] }): SpentDetail[] => {
        return [...(shop.mounts || []), ...(shop.pets || [])];
    };

    const getValueInCurrency = (values: Cost): number => {
        return currency === 'USD' ? values.dol : values.eur;
    };

    const shopList = getCombinedShopList(shop);

    return (
        <div className={styles.details}>
            <SubscriptionDetails subscription={subscription} currency={currency} getValueInCurrency={getValueInCurrency} />
            <ExtensionDetails extensionList={extensionList} currency={currency} getValueInCurrency={getValueInCurrency} />
            <ShopDetails shopList={shopList} currency={currency} getValueInCurrency={getValueInCurrency} />
        </div>
    );
};

export default Details;