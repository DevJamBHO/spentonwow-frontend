import React, { useState, useEffect } from 'react';
import styles from '@/styles/PieChart.module.scss';
import useSpentStore, { Cost, SpentDetail } from '@/store/useSpentStore';
import {translate} from "@/utils/translate";

// Fonction pour obtenir la valeur dans la devise sélectionnée
const getValueInCurrency = (values: Cost, currency: "USD" | "EUR"): number => {
    return currency === 'USD' ? values.dol : values.eur;
};

export interface ExpenseData {
    category: string;
    amount: number;
}

const PieChart: React.FC = () => {
    const subscription = useSpentStore(state => state.subscription);
    const extensions = useSpentStore(state => state.extensions);
    const shop = useSpentStore(state => state.shop);
    const currency = useSpentStore(state => state.currency);

    // Pour Deboguer, utiliser useEffect pour inspecter les données
    useEffect(() => {
        console.log("Extensions: ", extensions);
    }, [extensions]);

    // Calcul des coûts pour chaque catégorie en considérant seulement les éléments owned = true
    const subscriptionCost = getValueInCurrency(subscription.estimated_cost, currency);
    const extensionsCost = extensions.reduce((total, extension) => {
        const versionTotal = extension.Versions
            ?.filter(version => version.owned)
            .reduce((versionTotal, version) => versionTotal + getValueInCurrency(version.cost, currency), 0) ?? 0;

        // Log pour vérification des valeurs
        if (versionTotal > 0) {
            console.log(`Extension: ${extension.name}, Versions Total: ${versionTotal}`);
        }

        return total + versionTotal;
    }, 0);

    const mountsCost = shop.mounts.reduce((total, mount) => {
        if (mount.owned) {
            return total + getValueInCurrency(mount.cost, currency);
        }
        return total;
    }, 0);

    const petsCost = shop.pets.reduce((total, pet) => {
        if (pet.owned) {
            return total + getValueInCurrency(pet.cost, currency);
        }
        return total;
    }, 0);

    const expenses: ExpenseData[] = [
        { category: 'subscription', amount: subscriptionCost },
        { category: 'extensions', amount: extensionsCost },
        { category: 'mounts', amount: mountsCost },
        { category: 'pets', amount: petsCost }
    ];

    const colors = [
        '#6E2317',
        '#B28354',
        '#7D6150',
        '#47261F'
    ];

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    let cumulativePercent = 0;
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    return (
        <div className={styles.pieChartContainer}>
            <svg className={styles.pieChart} viewBox="-1.2 -1.2 2.4 2.4">
                {expenses.map((expense, index) => {
                    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
                    cumulativePercent += expense.amount / totalAmount;
                    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
                    const largeArcFlag = expense.amount / totalAmount > 0.5 ? 1 : 0;
                    const percentage = ((expense.amount / totalAmount) * 100).toFixed(1) + '%';

                    const [textX, textY] = getCoordinatesForPercent(cumulativePercent - (expense.amount / totalAmount) / 2);
                    return (
                        <g
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={styles.pieSliceContainer}
                        >
                            <path
                                d={`M ${startX} ${startY}
                                   A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
                                   L 0 0`}
                                fill={colors[index % colors.length]}
                                stroke="#fff"
                                strokeWidth="0.02"
                                className={`${styles.pieSlice} ${hoveredIndex === index ? styles.hovered : ''}`}
                            />
                            <text
                                x={textX * 0.9}
                                y={textY * 0.9}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                color="#000"
                                fontSize="0.12"
                                fontWeight="bold"
                                style={{ stroke: '#fff', strokeWidth: 0.05, paintOrder: 'stroke', strokeLinecap: 'butt', strokeLinejoin: 'round' }}
                            >
                                {percentage}
                            </text>
                        </g>
                    );
                })}
            </svg>
            <div className={styles.legend}>
                {expenses.map((expense, index) => (
                    <div
                        key={index}
                        className={`${styles.legendItem} ${hoveredIndex === index ? styles.hoveredLegendItem : ''}`}
                    >
                        <span
                            className={styles.legendColor}
                            style={{ backgroundColor: colors[index % colors.length] }}
                        ></span>
                        <span className={styles.legendText}>{translate(expense.category)}</span>
                        <span className={styles.legendAmount}>{expense.amount} {currency === 'EUR' ? '€' : '$'}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChart;