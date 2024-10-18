import React from 'react';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import { translate } from '@/utils/translate';

const Legals: React.FC = () => {
    return (
        <Layout big>
            <Head>
                <meta name="description" content={translate('meta.description')} />
                <meta property="og:description" content={translate('meta.descriptionDashboard')} />
            </Head>
            Legals
        </Layout>
    );
};
export default Legals;