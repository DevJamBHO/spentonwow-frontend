import React from 'react';
import Head from 'next/head';
import Layout from '@/layouts/Layout';
import { translate } from '@/utils/translate';
import Container from "@/components/Container";

const CharacterNotFound: React.FC = () => {
    return (
        <Layout>
            <Head>
                <meta name="description" content={translate('meta.description')} />
                <meta property="og:description" content={translate('meta.descriptionDashboard')} />
            </Head>
            <Container
                header={<div>{translate('siteName')}</div>}
            >
                <div style={{ textAlign: 'left', lineHeight: '1.8', marginTop: '20px' }}>
                    <h1 style={{ marginBottom: '20px' }}>{translate('error.characterNotFound.title')}</h1>
                    <p style={{ marginBottom: '20px' }}>{translate('error.characterNotFound.description')}</p>
                    <ul style={{ marginLeft: '20px' }}>
                        <li style={{ marginBottom: '20px' }}><strong>{translate('error.characterNotFound.incorrectNameTitle')}</strong><br />
                            {translate('error.characterNotFound.incorrectNameDescription')}<br />
                            <a href="https://worldofwarcraft.com/" target="_blank" rel="noopener noreferrer">{translate('error.characterNotFound.armoryLinkText')}</a>
                        </li>
                        <li style={{ marginBottom: '20px' }}><strong>{translate('error.characterNotFound.privateProfileTitle')}</strong><br />
                            {translate('error.characterNotFound.privateProfileDescription')}<br />
                            <a href="https://account.battle.net/privacy" target="_blank" rel="noopener noreferrer">{translate('error.characterNotFound.privacySettingsLinkText')}</a>
                        </li>
                    </ul>
                </div>
            </Container>
        </Layout>
    );
};

export default CharacterNotFound;
