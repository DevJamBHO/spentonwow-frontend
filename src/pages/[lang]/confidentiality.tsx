import React from 'react';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import { translate } from '@/utils/translate';
import Container from "@/components/Container";
import styles from '@/styles/Legals.module.scss';

const Confidentiality: React.FC = () => {
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
                                {translate('legal.legalMention.dataCollectTitle')}
                            </div>
                            <div className={styles.content}>
                                <div>
                                    {translate('legal.legalMention.identificationContent')}
                                </div>
                                <div>
                                    {translate('legal.legalMention.dataCollectContent')}
                                </div>
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.dataAutomaticTitle')}
                            </div>
                            <div className={styles.content}>
                                <div>
                                    {translate('legal.legalMention.dataAutomaticContent1')}
                                </div>
                                <ul>
                                    <li>{translate('legal.legalMention.dataAutomaticStep1')}</li>
                                    <li>{translate('legal.legalMention.dataAutomaticStep2')}</li>
                                    <li>{translate('legal.legalMention.dataAutomaticStep3')}</li>
                                </ul>
                                <div>
                                    {translate('legal.legalMention.dataAutomaticContent2')}
                                </div>
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.linkTitle')}
                            </div>
                            <div className={styles.content}>
                                {translate('legal.legalMention.linkContent')}
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.editPoliticTitle')}
                            </div>
                            <div className={styles.content}>
                                {translate('legal.legalMention.editPoliticContent')}
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.contactTitle')}
                            </div>
                            <div className={styles.content}>
                                {translate('legal.legalMention.contactContent')} wowchievement@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    );
};
export default Confidentiality;