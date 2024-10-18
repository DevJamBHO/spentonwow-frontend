import React from 'react';
import styles from '../styles/Container.module.scss';

interface ContainerProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({ children, header, className = '', style }) => {
    return (
        <div className={`${styles.container} ${className}`} style={style}>
            {header && <header className={styles.header}>{header}</header>}
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default Container;