import React from "react";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {translate} from "@/utils/translate";
import {formatCurrency, formatGold} from "@/utils/formatCurrency";
import Card from "@/components/Card";
import useTokenStore from "@/store/useTokenStore";
import {convertMoneyToGold} from "@/utils/conversion";

interface GoldCardProps {
    amountToUse: number;
    currency: string;
}

const GoldCard: React.FC<GoldCardProps> = ({amountToUse, currency}) => {
    const tokenPriceInRealMoney = useTokenStore(state => state.tokenPriceInRealMoney);
    const goldPerToken = useTokenStore(state => state.goldPerToken);

    return(
        <Card
            icon={faCoins}
            title={translate('goldCoinsEquivalent')}
            value={formatGold(convertMoneyToGold(amountToUse, currency))}
            description={`(${formatCurrency(amountToUse, { currency })} / ${currency === 'USD' ? tokenPriceInRealMoney.dol : tokenPriceInRealMoney.eur}) x ${goldPerToken}`}
        />
    )
};

export default GoldCard;