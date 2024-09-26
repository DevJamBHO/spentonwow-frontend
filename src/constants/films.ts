import { translate } from '@/utils/translate';

export interface Film {
    price: number;
    name: string;
}

export const films: Film[] = [
    { price: 356000000, name: translate('films.avengersEndgame') },
    { price: 250000000, name: translate('films.avatar') },
    { price: 300000000, name: translate('films.piratesCaribbean') },
    { price: 350000000, name: translate('films.avengersInfinityWar') },
    { price: 300000000, name: translate('films.justiceLeague') },
    { price: 275000000, name: translate('films.starWarsForceAwakens') },
    { price: 245000000, name: translate('films.spectre') },
    { price: 258000000, name: translate('films.lionKing2019') },
    { price: 260000000, name: translate('films.darkKnightRises') },
    { price: 250000000, name: translate('films.starWarsRiseSkywalker') },
    { price: 300000000, name: translate('films.avengersAgeUltron') },
    { price: 200000000, name: translate('films.frozenII') },
    { price: 250000000, name: translate('films.batmanSuperman') },
    { price: 220000000, name: translate('films.hobbitBattleFiveArmies') },
    { price: 237000000, name: translate('films.harryPotterHalfBloodPrince') },
    { price: 225000000, name: translate('films.frozen') },
    { price: 200000000, name: translate('films.blackPanther') },
    { price: 245000000, name: translate('films.thorLoveThunder') },
    { price: 150000000, name: translate('films.inception') },
    { price: 200000000, name: translate('films.matrixResurrections') },
    { price: 160000000, name: translate('films.madMax') },
    { price: 185000000, name: translate('films.wonderWoman') },
    { price: 200000000, name: translate('films.captainAmericaCivilWar') },
    { price: 200000000, name: translate('films.spiderManNoWayHome') },
    { price: 230000000, name: translate('films.fateFurious') },
    { price: 250000000, name: translate('films.hobbitUnexpectedJourney') },
    { price: 170000000, name: translate('films.guardiansGalaxy') },
    { price: 225000000, name: translate('films.jurassicWorld') },
    { price: 175000000, name: translate('films.jungleBook2016') },
    { price: 150000000, name: translate('films.rogueOne') },
    { price: 190000000, name: translate('films.ironMan3') },
    { price: 200000000, name: translate('films.manSteel') },
    { price: 250000000, name: translate('films.amazingSpiderMan2') },
    { price: 185000000, name: translate('films.transformersDarkMoon') },
    { price: 220000000, name: translate('films.terminatorSalvation') },
    { price: 215000000, name: translate('films.narniaPrinceCaspian') },
    { price: 237000000, name: translate('films.quantumSolace') },
    { price: 225000000, name: translate('films.xmenDaysFuturePast') },
    { price: 160000000, name: translate('films.warcraft') }
];