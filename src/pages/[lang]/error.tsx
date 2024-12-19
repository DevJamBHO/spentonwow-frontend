import React from 'react';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import { translate } from '@/utils/translate';
import Container from "@/components/Container";

const Cookies: React.FC = () => {
    return (
        <Layout>
            <Head>
                <meta name="description" content={translate('meta.description')} />
                <meta property="og:description" content={translate('meta.descriptionDashboard')} />
            </Head>
            <Container
                header={<div>{translate('siteName')}</div>}
            >
                ERROR
            </Container>
        </Layout>
    );
};
export default Cookies;