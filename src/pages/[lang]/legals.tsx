import React from 'react';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import { translate } from '@/utils/translate';
import Container from '@/components/Container';
import styles from '@/styles/Legals.module.scss';

const Legals: React.FC = () => {
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
                                {translate('legal.legalMention.identificationTitle')}
                            </div>
                            <div className={styles.content}>
                                <div>
                                    {translate('legal.legalMention.identificationContent')}
                                </div>
                                <div>
                                <span className={styles.question}>
                                    {translate('legal.legalMention.mailQuestion')} :
                                </span> wowchievement@gmail.com
                                </div>
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.hostTitle')}
                            </div>
                            <div className={styles.content}>
                                <div>
                                <span className={styles.question} >
                                    {translate('legal.legalMention.hostHostQuestion')} :
                                </span> {translate('legal.legalMention.hostHostAnswer')}
                                </div>
                                <div>
                                    <span className={styles.question}>{translate('legal.legalMention.hostHostAddressQuestion')}</span> :
                                    {translate('legal.legalMention.hostHostAddressAnswer')}
                                </div>
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.intellectualTitle')}
                            </div>
                            <div className={styles.content}>
                                {translate('legal.legalMention.intellectualContent')}
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.personalDataTitle')}
                            </div>
                            <div className={styles.content}>
                                {translate('legal.legalMention.personalDataContent')}
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.liabilityTitle')}
                            </div>
                            <div className={styles.content}>
                                {translate('legal.legalMention.liabilityContent')}
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.editTitle')}
                            </div>
                            <div className={styles.content}>
                                {translate('legal.legalMention.editContent')}
                            </div>
                        </div>
                        <div className={styles.bloc}>
                            <div className={styles.title}>
                                {translate('legal.legalMention.rightTitle')}
                            </div>
                            <div className={styles.content}>
                                {translate('legal.legalMention.rightContent')}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    );
};
export default Legals;