import React, {useEffect, useState} from "react";
import Card from "@/components/Card";
import {translate} from "@/utils/translate";
import {formatCurrency} from "@/utils/formatCurrency";
import {faFilm} from "@fortawesome/free-solid-svg-icons";
import { Film, films } from '@/constants/films';

interface FilmCardProps {
    amountToUse: number;
    currency: string;
}

const FilmCard: React.FC<FilmCardProps> = ({amountToUse, currency}) => {

    const [selectedFilm, setSelectedFilm] = useState<Film>(films[0]);
    useEffect(() => {
        const randomFilm = films[Math.floor(Math.random() * films.length)];
        setSelectedFilm(randomFilm);
    }, []);

    const calculateFilmEquivalent = (amount: number, film: Film) => {
        const costInEUR = film.price / (currency === 'USD' ? 1.2 : 1);
        const percentage = ((amount / costInEUR) * 100).toFixed(6);
        return `${percentage} ${translate('ofProductionCost')} ${film.name}`;
    };

    return(
        <Card
            icon={faFilm}
            title={translate('filmProductionCost')}
            value={calculateFilmEquivalent(amountToUse, selectedFilm)}
            description={`${translate('ofProductionCost')} ${selectedFilm.name} (${formatCurrency(selectedFilm.price, { currency })})`}
        />
    )
};

export default FilmCard;