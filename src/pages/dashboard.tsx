import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
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
import FakeDetails from "@/components/Dashboard/FakeDetails";
import AdBlockDetector from '@/components/AdBlockDetector';
import Share from "@/components/Dashboard/Share";
import Wowchievement from "@/components/Dashboard/Wowchievement";
import Loading from '@/components/Loading';

const Dashboard: React.FC = () => {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [adBlockDetected, setAdBlockDetected] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
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
            setLoading(true);
            fetchSpentData(region, server, character)
                .then(() => setLoading(false));
        }
    }, [region, server, character]);

    if (!isClient) {
        return null;
    }

    if (loading) {
        return  (
            <Layout big>
                <Loading />
            </Layout>
        );
    }

    return (
        <Layout big>
            <Head>
                <meta name="description" content={translate('meta.description')} />
                <meta property="og:description" content={translate('meta.descriptionDashboard')} />
            </Head>
            <AdBlockDetector onDetect={setAdBlockDetected} />
            <div className={styles.amountDetails}>
                <div className={styles.mainContainer}>
                    <Container className={styles.mainContainer}>
                        <Header />
                        <AmountSection />
                        <CardList />
                    </Container>
                    <Container className={styles.mainContainer}>
                        {adBlockDetected ? (
                            <FakeDetails />
                        ) : (
                            <Details />
                        )}
                    </Container>
                </div>
                <div className={styles.sideContainers}>
                    <Container className={styles.sideContainer}>
                        {translate('publicity')}
                    </Container>
                    <Container className={styles.sideContainer}>
                        <Share />
                    </Container>
                    <Container className={styles.sideContainer}>
                        <Wowchievement />
                    </Container>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;