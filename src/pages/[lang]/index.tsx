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
import {getLanguage} from "@/utils/language";

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
  const [errorMessage, setErrorMessage] = useState<string>('');
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const language = getLanguage()
    if (region !== '' && server !== '' && character !== '') {
      await fetchSpentData(region, server, character);
      router.push(`/${language}/dashboard?region=${region}&server=${server}&character=${character}`);
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
          <meta name="title" content={translate('meta.title')} />
          <meta property="og:title" content={translate('meta.title')} />
        </Head>
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