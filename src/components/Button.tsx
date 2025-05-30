import React from 'react';
import styles from '../styles/Button.module.scss';

interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
    isActive?: boolean;
    plain?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type, className = '', onClick, children, isActive = false, plain = false, disabled = false }) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${isActive ? styles.active : ''} ${plain ? styles.plain : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;