import React, {useEffect, useState} from "react";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {translate} from "@/utils/translate";
import {formatCurrency, formatGold} from "@/utils/formatCurrency";
import Card from "@/components/Card";
import useTokenStore from "@/store/useTokenStore";

interface GoldCardProps {
    amountToUse: number;
    currency: string;
}

const GoldCard: React.FC<GoldCardProps> = ({amountToUse, currency}) => {
    const [localGoldEquivalent, setLocalGoldEquivalent] = useState<number>(0);
    const goldEquivalentFromStore = useTokenStore(state => state.tokenPriceInRealMoney);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (goldEquivalentFromStore !== undefined && goldEquivalentFromStore !== null) {
                setLocalGoldEquivalent(goldEquivalentFromStore);
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [goldEquivalentFromStore]);

    return(
        <Card
            icon={faCoins}
            title={translate('goldCoinsEquivalent')}
            value={formatGold(localGoldEquivalent)}
            description={`${translate('amountSpentSince')} ${formatCurrency(amountToUse, { currency })} en pièces d'or WoW`}
        />
    )
};

export default GoldCard;