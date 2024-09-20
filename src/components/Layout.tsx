import React from 'react';
import styles from '@/styles/layout.module.scss';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Layout;