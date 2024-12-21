import React from 'react';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import { translate } from '@/utils/translate';
import Container from "@/components/Container";
import styles from '@/styles/Legals.module.scss';

const Cookies: React.FC = () => {
    return (
        <Layout>
            <Head>
                <meta name="description" content={translate('meta.description')}/>
                <meta property="og:description" content={translate('meta.descriptionDashboard')}/>
                <meta name="title" content={translate('meta.title')}/>
                <meta property="og:title" content={translate('meta.title')}/>
            </Head>
            <Container
                header={<div>{translate('siteName')}</div>}
            >
                <div className={styles.legal}>
                <div className={styles.legalMentionWrapper}>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.cookieExplainTitle')}
                            </div>
                            <div className={styles.content}>
                                {translate('legal.legalMention.cookieExplainContent')}
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.cookieUseTitle')}
                            </div>
                            <div className={styles.content}>
                                {translate('legal.legalMention.cookieUseContent')}
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.cookiePlausibleTitle')}
                            </div>
                            <div className={styles.content}>
                                {translate('legal.legalMention.cookiePlausibleContent')}
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.cookieEditTitle')}
                            </div>
                            <div className={styles.content}>
                                {translate('legal.legalMention.cookieEditContent')}
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.cookieContactTitle')}
                            </div>
                            <div className={styles.content}>
                                {translate('legal.legalMention.cookieContactContent')} wowchievement@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    );
};
export default Cookies;