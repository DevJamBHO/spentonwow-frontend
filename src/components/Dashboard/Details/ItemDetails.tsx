import React from 'react';
import { formatCurrency } from '@/utils/formatCurrency';
import styles from '@/styles/Details.module.scss';
import { translate } from '@/utils/translate';
import { Cost, SpentDetail } from '@/store/useSpentStore';

interface ItemDetailsProps {
    item: SpentDetail;
    keyIndex: number;
    showNotOwned: boolean;
    getValueInCurrency: (values: Cost) => number;
    currency: string;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, keyIndex, showNotOwned, getValueInCurrency, currency }) => {
    if (item.Versions) {
        const allNotOwnedVersions = item.Versions.filter(version => !version.owned);

        return (
            <React.Fragment key={`${item.name}-${keyIndex}`}>
                {item.Versions.filter(version => version.owned).map((ownedVersion, verKey) => (
                    <div className={styles['shop-item']} key={`${item.name}-${ownedVersion.edition}-${verKey}`}>
                        <div className={styles['item-name']}>
                            <div>{`${item.name} - ${ownedVersion.edition}`}</div>
                        </div>
                        <div>
                            {formatCurrency(getValueInCurrency(ownedVersion.cost), { currency })}
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
                                    {formatCurrency(getValueInCurrency(version.cost), { currency })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment key={`${item.name}-${keyIndex}`}>
                {item.owned && (
                    <div className={styles['shop-item']}>
                        <div className={styles['item-name']}>
                            <div>{item.name}</div>
                        </div>
                        <div>
                            {formatCurrency(getValueInCurrency(item.cost), { currency })}
                        </div>
                    </div>
                )}
                {showNotOwned && !item.owned && (
                    <div className={styles['not-owned']}>
                        <div className={styles['item-name']}>
                            <div>{item.name} ({translate('notOwned')})</div>
                        </div>
                        <div>
                            {formatCurrency(getValueInCurrency(item.cost), { currency })}
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
};

export default ItemDetails;