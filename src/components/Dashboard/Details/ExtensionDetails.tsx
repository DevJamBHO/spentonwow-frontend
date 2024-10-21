import React, { useState } from 'react';
import { SpentDetail, Cost } from '@/store/useSpentStore';
import ItemDetails from './ItemDetails';
import styles from '@/styles/Details.module.scss';
import { translate } from '@/utils/translate';

interface ExtensionDetailsProps {
    extensionList: SpentDetail[];
    currency: string;
    getValueInCurrency: (values: Cost) => number;
}

const ExtensionDetails: React.FC<ExtensionDetailsProps> = ({ extensionList, currency, getValueInCurrency }) => {
    const [showExtensionNotOwned, setShowExtensionNotOwned] = useState(false);

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
            <p>{translate('extensions')} ({translate('owned', {count: countOwnedItems(extensionList)})}) :</p>
            <div className={styles.extensions}>
                {extensionList?.length > 0 && extensionList.map((item, key) => (
                    <ItemDetails
                        key={`extension-${key}`}
                        item={item}
                        keyIndex={key}
                        showNotOwned={showExtensionNotOwned}
                        getValueInCurrency={getValueInCurrency}
                        currency={currency}
                    />
                ))}
                {extensionList.filter(item => !item.owned).length > 0 && (
                    <div className={styles['not-owned-count']} onClick={() => setShowExtensionNotOwned(!showExtensionNotOwned)}>
                        {showExtensionNotOwned ? translate('hideItems') : `(+ ${extensionList.filter(item => !item.owned).length} ${translate('showItems')})`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExtensionDetails;