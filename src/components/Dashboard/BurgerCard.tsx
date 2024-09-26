import React from "react";
import Card from "@/components/Card";
import {faHamburger} from "@fortawesome/free-solid-svg-icons";
import {translate} from "@/utils/translate";
import {formatCurrency} from "@/utils/formatCurrency";

interface BurgerCardProps {
    amountToUse: number;
    currency: string;
}

const BurgerCard: React.FC<BurgerCardProps> = ({amountToUse, currency}) => {
    const bigMacPrice = currency === 'USD' ? 5.65 : 4.30;

    const calculateBigMacIndex = (amount: number) => {
        return (amount / bigMacPrice).toFixed(2);
    };
    return(
        <Card
            icon={faHamburger}
            title={translate('bigMacEquivalent')}
            value={`${calculateBigMacIndex(amountToUse)} Big Macs`}
            description={`${translate('bigMacPriceInfo')} (${formatCurrency(bigMacPrice, { currency })})`}
        />
    )
};

export default BurgerCard;