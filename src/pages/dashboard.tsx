import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import Container from '@/components/Container';
import { detectLanguage, setLanguage } from '@/utils/language';
import useSpentStore from '@/store/useSpentStore';
import Header from '@/components/Dashboard/Header';
import AmountSection from '@/components/Dashboard/AmountSection';
import CardList from '@/components/Dashboard/CardList';
import styles from '@/styles/Dashboard.module.scss';
import { translate } from '@/utils/translate';
import Details from '@/components/Dashboard/Details';
import FakeDetails from '@/components/Dashboard/FakeDetails';
import AdBlockDetector from '@/components/AdBlockDetector';
import Share from '@/components/Dashboard/Share';
import Wowchievement from '@/components/Dashboard/Wowchievement';
import Loading from '@/components/Loading';
import PieChart from '@/components/Dashboard/PieChart';
import { trackPlausibleEvent } from '@/utils/plausible';
import {GetServerSidePropsContext} from "next";
import FakePieChart from "@/components/Dashboard/FakePieChart";

interface DashboardProps {
    initialAmountEur: number;
    initialAmountUsd: number;
    region: string;
    server: string;
    character: string;
}

const Dashboard: React.FC<DashboardProps> = ({ initialAmountEur, initialAmountUsd, region, server, character }) => {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [adBlockDetected, setAdBlockDetected] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
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
                .then(() => setLoading(false))
                .catch((error: any) => {
                    console.log('zut', error);
                    setLoading(false);  // Assurer que le chargement se termine même en cas d'erreur
                });
        }
    }, [region, server, character]);

    useEffect(() => {
        trackPlausibleEvent('adBlock', { active: adBlockDetected });
    }, [adBlockDetected]);

    if (!isClient) {
        return null;
    }

    if (loading) {
        return (
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
                    {
                        !adBlockDetected && (
                            <Container className={styles.sideContainer}>
                                {translate('publicity')}
                            </Container>
                        )
                    }
                    <Container className={styles.sideContainer}>
                        <Share initialAmountEur={initialAmountEur} initialAmountUsd={initialAmountUsd} />
                    </Container>
                    <Container className={styles.sideContainer}>
                        <Wowchievement region={region} server={server} character={character} />
                    </Container>
                    <Container className={styles.sideContainer}>
                        {adBlockDetected ? (
                            <FakePieChart />
                        ) : (
                            <PieChart />
                        )}
                    </Container>
                </div>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { region, server, character } = context.query;
    const initialAmountEur = 0;
    const initialAmountUsd = 0;

    return {
        props: {
            initialAmountEur,
            initialAmountUsd,
            region: region as string || "",
            server: server as string || "",
            character: character as string || ""
        },
    };
}

export default Dashboard;