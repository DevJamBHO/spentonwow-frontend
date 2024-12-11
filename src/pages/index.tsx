import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/layouts/Layout';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Container from '@/components/Container';
import styles from '@/styles/Login.module.scss';
import useCapabilitiesStore from '@/store/useCapabilitiesStore';
import useSpentStore from '@/store/useSpentStore';
import { GetServerSideProps } from "next";
import { getCapabilities } from "@/api/capabilities";
import { translate } from '@/utils/translate';
import Head from "next/head";
import AdBlockDetector from "@/components/AdBlockDetector";
import {trackPlausibleEvent} from "@/utils/plausible";
import AdSense from "@/components/AdSense";

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
  const fetchSpentData = useSpentStore((state) => state.fetchSpentData);
  const [region, setRegion] = useState<string>('');
  const [server, setServer] = useState<string>('');
  const [character, setCharacter] = useState<string>('');
  const [isClient, setIsClient] = useState<boolean>(false);
  const [adBlockDetected, setAdBlockDetected] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const formattedCapabilities = formatCapabilities(capabilities);
    setCapabilities(formattedCapabilities);
  }, [capabilities, setCapabilities, formatCapabilities]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    trackPlausibleEvent('adBlock', { active: adBlockDetected });
  }, [adBlockDetected]);

  const handleRegionSelect = (selectedRegion: string) => {
    setRegion(selectedRegion);
    setServer('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (region !== '' && server !== '' && character !== '') {
      await fetchSpentData(region, server, character);
      router.push(`/dashboard?region=${region}&server=${server}&character=${character}`);
    } else {
      setErrorMessage("Tous les champs doivent être remplis !");
    }
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
        <AdBlockDetector onDetect={setAdBlockDetected} />
        <Container
            header={<div>{translate('siteName')}</div>}
        >
          <section className={styles.intro}>
            <p>{translate('introText1')}</p><br/>
            <p>{translate('introText2')}</p><br/>
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
            <div className={styles.error}>
              {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </div>
            <Button type="submit" plain className={styles.button}>
              {translate('submit')}
            </Button>
          </form>
        </Container>
        {
            !adBlockDetected && (
                <div className={styles.adContainer}>
                  <AdSense adSlot="8629995218" />
                </div>
            )
        }
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