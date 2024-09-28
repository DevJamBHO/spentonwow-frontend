import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../layouts/Layout';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Container from '../components/Container';
import styles from '../styles/Login.module.scss';
import useCapabilitiesStore from '@/store/useCapabilitiesStore';
import { GetServerSideProps } from "next";
import { getCapabilities } from "@/api/capabilities";
import { translate } from '@/utils/translate';
import { apiFetch } from '@/utils/apiService';
import Head from "next/head";

interface LoginProps {
  capabilities: any;
}

interface ServerType {
  Slug: string;
  Name: string;
  Region: string;
}

const Login: React.FC<LoginProps> = ({ capabilities }) => {
  const setCapabilities = useCapabilitiesStore((state) => state.setCapabilities);
  const storedCapabilities = useCapabilitiesStore((state) => state.capabilities);
  const formatCapabilities = useCapabilitiesStore((state) => state.formatCapabilities);
  const [region, setRegion] = useState<string>('');
  const [server, setServer] = useState<string>('');
  const [character, setCharacter] = useState<string>('');
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const formattedCapabilities = formatCapabilities(capabilities);
    setCapabilities(formattedCapabilities);
  }, [capabilities, setCapabilities, formatCapabilities]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRegionSelect = (selectedRegion: string) => {
    setRegion(selectedRegion);
    setServer('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/dashboard?region=${region}&server=${server}&character=${character}`);
  };

  if (!isClient) {
    return null;
  }

  return (
      <Layout>
        <Head>
          <meta name="description" content={translate('meta.description')} />
          <meta property="og:description" content={translate('meta.description')} />
        </Head>
        <Container
            header={<div>{translate('siteName')}</div>}
            footer={
              <div>
                <p>&copy; 2024 {translate('siteName')}. {translate('allRightsReserved')}</p>
                <p>{translate('termsAndConditions')} | {translate('privacyPolicy')}</p>
              </div>
            }
        >
          <section className={styles.intro}>
            <p>{translate('introText1')}</p>
            <p>{translate('introText2')}</p>
            <p>{translate('introText3')}</p>
          </section>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.buttonGroup}>
              {storedCapabilities && Object.keys(storedCapabilities).map((regionKey: string) => (
                  <Button
                      key={regionKey}
                      type="button"
                      className={styles.regionButton}
                      onClick={() => handleRegionSelect(regionKey)}
                      isActive={region === regionKey}
                  >
                    {regionKey.toUpperCase()}
                  </Button>
              ))}
            </div>
            <Select
                id="server"
                value={server}
                onChange={(e) => setServer(e)}
                label={translate('server')}
                filtrable={true}
                options={storedCapabilities && region !== '' ? storedCapabilities[region].map((server: ServerType) => ({
                  value: server.Slug,
                  label: server.Name
                })) : []}
            />
            <Input
                id="character"
                type="text"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                required
                disabled={server === ''}
                label={translate('character')}
            />
            <Button type="submit" plain className={styles.button}>
              {translate('submit')}
            </Button>
          </form>
          <div className={styles.adContainer}>
            {translate('publicity')}
          </div>
        </Container>
      </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const capabilities = await getCapabilities();
  return {
    props: {
      capabilities,
    },
  };
};

export default Login;