// file: Card.tsx
import React, { useState } from 'react';
import styles from '@/styles/Card.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface CardProps {
    icon: IconDefinition;
    title: string;
    value: string | number;
    description?: string;
}

const Card: React.FC<CardProps> = ({ icon, title, value, description }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={styles.cardContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`${styles.card} ${isHovered ? styles.isFlipped : ''}`}>
                <div className={styles.cardFront}>
                    <FontAwesomeIcon icon={icon} className={styles.cardIcon} />
                    <div className={styles.cardTitle}>{title}</div>
                    <div className={styles.cardValue}>{value}</div>
                </div>
                <div className={styles.cardBack}>
                    <div className={styles.cardDescription}>{description}</div>
                </div>
            </div>
        </div>
    );
};

export default Card;