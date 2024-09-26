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

const Dashboard: React.FC = () => {
    const [currency, setCurrency] = useState<string>('EUR');
    const [isClient, setIsClient] = useState<boolean>(false);
    const router = useRouter();
    const { region, server, character } = router.query;

    const setResult = useSpentStore(state => state.setResult);
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
    }, [region, server, character, setResult]);


    const amountInEuros = 500;

    if (!isClient) {
        return null;
    }

    return (
        <Layout big>
            <div className={styles.amountDetails}>
                <Container className={styles.mainContainer}>
                    <Header/>
                    <AmountSection
                        amountInEuros={amountInEuros}
                    />
                    <CardList
                        amountInEuros={amountInEuros}
                    />
                </Container>
                <div className={styles.sideContainers}>
                    <Container className={styles.sideContainer}>
                        dfef
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