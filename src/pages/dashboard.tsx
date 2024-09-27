import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/layouts/Layout';
import Container from '@/components/Container';
import { detectLanguage, setLanguage } from '@/utils/language';
import useSpentStore from "@/store/useSpentStore";
import Header from '@/components/Dashboard/Header';
import AmountSection from '@/components/Dashboard/AmountSection';
import CardList from '@/components/Dashboard/CardList';
import styles from '@/styles/Dashboard.module.scss';
import { translate } from "@/utils/translate";
import Details from "@/components/Dashboard/Details";

const Dashboard: React.FC = () => {
    const [isClient, setIsClient] = useState<boolean>(false);
    const router = useRouter();
    const { region, server, character } = router.query;

    const fetchSpentData = useSpentStore(state => state.fetchSpentData);

    useEffect(() => {
        const lang = detectLanguage();
        setLanguage(lang);
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (region && server && character) {
            fetchSpentData(region, server, character);
        }
    }, [region, server, character]);

    if (!isClient) {
        return null;
    }

    return (
        <Layout big>
            <div className={styles.amountDetails}>
                <div className={styles.mainContainer}>
                    <Container className={styles.mainContainer}>
                        <Header />
                        <AmountSection />
                        <CardList />
                    </Container>
                    <Container className={styles.mainContainer}>
                        <Details />
                    </Container>
                </div>
                <div className={styles.sideContainers}>
                    <Container className={styles.sideContainer}>
                        {translate('publicity')}
                    </Container>
                    <Container className={styles.sideContainer}>
                        <h2>TODO</h2>
                    </Container>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;