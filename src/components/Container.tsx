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
            {header && <header className={styles.header}>
                <a href="/">
                    <img alt="Wowspent logo" src="/images/logo.webp" width="50" height="50"/>
                    {header}
                </a>
            </header>}
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default Container;