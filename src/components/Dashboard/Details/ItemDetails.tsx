import React from 'react';
import { formatCurrency } from '@/utils/formatCurrency';
import styles from '@/styles/Details.module.scss';
import { translate } from '@/utils/translate';
import { Cost, SpentDetail } from '@/store/useSpentStore';
import WowHeadTooltip from "@/components/Dashboard/WowHeadTooltip";

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
                            <div className={styles['subscription-period']} key={`${item.name}-${version.edition}-${index}`}>
                                <div className={styles['period-date']}>
                                    <div>{`${item.name} - ${version.edition}`} ({translate('notOwned')})</div>
                                </div>
                                <div className={styles['period-length']}>
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
                            {
                                item.wow_head_link ? (
                                    <WowHeadTooltip
                                        id={item.wow_head_link.id}
                                        type={item.wow_head_link.type}
                                        icon={item.wow_head_link.icon}
                                        name={item.name}
                                    />
                                ) : (
                                    <div>{item.name}</div>
                                )
                            }

                        </div>
                        <div>
                            {formatCurrency(getValueInCurrency(item.cost), {currency})}
                        </div>
                    </div>
                )}
                {showNotOwned && !item.owned && (
                    <div className={styles['subscription-period']}>
                        <div className={styles['period-date']}>
                            {
                                item.wow_head_link ? (
                                    <div className={styles['wowhead-link']}>
                                        <WowHeadTooltip
                                            id={item.wow_head_link.id}
                                            type={item.wow_head_link.type}
                                            icon={item.wow_head_link.icon}
                                            name={item.name}
                                        /> ({translate('notOwned')})
                                    </div>
                                ) : (
                                    <div>{item.name} ({translate('notOwned')})</div>
                                )
                            }
                        </div>
                        <div className={styles['period-length']}>
                            {formatCurrency(getValueInCurrency(item.cost), { currency })}
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
};

export default ItemDetails;