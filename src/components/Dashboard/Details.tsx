import React, { FC } from "react";
import useSpentStore, { Cost, SubscriptionDetail } from "@/store/useSpentStore";
import styles from '@/styles/Details.module.scss';

import SubscriptionDetails from '@/components/Dashboard/Details/SubscriptionDetails';
import ExtensionDetails from '@/components/Dashboard/Details/ExtensionDetails';
import ShopDetails from '@/components/Dashboard/Details/ShopDetails';

const Details: FC = () => {
    const extensionList = useSpentStore(state => state.extensions);
    const shop = useSpentStore(state => state.shop);
    const currency = useSpentStore(state => state.currency);
    const subscription: SubscriptionDetail = useSpentStore(state => state.subscription);

    const getValueInCurrency = (values: Cost): number => {
        return currency === 'USD' ? values.dol : values.eur;
    };

    return (
        <div className={styles.details}>
            <SubscriptionDetails subscription={subscription} currency={currency} getValueInCurrency={getValueInCurrency} />
            <ExtensionDetails extensionList={extensionList} currency={currency} getValueInCurrency={getValueInCurrency} />
            <ShopDetails title="mounts" shopList={shop.mounts} currency={currency} getValueInCurrency={getValueInCurrency} />
            <ShopDetails title="pets" shopList={shop.pets} currency={currency} getValueInCurrency={getValueInCurrency} />
            <ShopDetails title="toys" shopList={shop.toys} currency={currency} getValueInCurrency={getValueInCurrency} />
            <ShopDetails title="bundles" shopList={shop.bundles} currency={currency} getValueInCurrency={getValueInCurrency} />
        </div>
    );
};

export default Details;