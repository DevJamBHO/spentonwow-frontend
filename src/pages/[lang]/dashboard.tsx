import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import Container from '@/components/Container';
import { detectLanguage, getLanguage, setLanguage } from '@/utils/language';
import useSpentStore from '@/store/useSpentStore';
import Header from '@/components/Dashboard/Header';
import AmountSection from '@/components/Dashboard/AmountSection';
import CardList from '@/components/Dashboard/CardList';
import styles from '@/styles/Dashboard.module.scss';
import { translate } from '@/utils/translate';
import Details from '@/components/Dashboard/Details';
import Share from '@/components/Dashboard/Share';
import Loading from '@/components/Loading';
import PieChart from '@/components/Dashboard/PieChart';
import { GetServerSidePropsContext } from 'next';
import { RedirectException } from "@/utils/apiService";

interface DashboardProps {
    initialAmountEur: number;
    initialAmountUsd: number;
    region: string;
    server: string;
    character: string;
}

const Dashboard: React.FC<DashboardProps> = ({ initialAmountEur, initialAmountUsd, region, server, character }) => {
    const [isClient, setIsClient] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchSpentData = useSpentStore((state) => state.fetchSpentData);
    const router = useRouter();

    useEffect(() => {
        const lang = detectLanguage();
        if (lang !== getLanguage()) {
            setLanguage(lang);
        }
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (region && server && character) {
            setLoading(true);
            fetchSpentData(region, server, character)
                .then(() => setLoading(false))
                .catch((error) => {
                    if (error instanceof RedirectException) {
                        //router.push(error.path);
                    } else {
                        console.error(translate('dataError'), error);
                    }
                });
        } else {
            router.push('/')
        }
    }, [region, server, character]);

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
                <meta name="title" content={translate('meta.title')} />
                <meta property="og:title" content={translate('meta.title')} />
            </Head>
            <div className={styles.amountDetails}>
                <div className={styles.mainContainer}>
                    <Container className={styles.mainContainer}>
                        <Header />
                        <AmountSection />
                        <CardList />
                        <a target="_blank" href="https://sapling-toss.com/blog/how-spent-works/">
                            {translate('explainAmount')}
                        </a>
                    </Container>
                    <Container className={styles.mainContainer}>
                        <Details />
                    </Container>
                </div>
                <div className={styles.sideContainers}>
                    <Container className={styles.sideContainer}>
                        <Share initialAmountEur={initialAmountEur} initialAmountUsd={initialAmountUsd} />
                    </Container>
                    <Container className={styles.sideContainer}>
                        <PieChart />
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