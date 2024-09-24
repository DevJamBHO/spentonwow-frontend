import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'animate.css/animate.min.css'; // Import animate.css
import Layout from '../layouts/Layout';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Container from '../components/Container';
import styles from '../styles/Login.module.scss';
import useCapabilitiesStore from '@/store/useCapabilitiesStore';
import {GetServerSideProps} from "next";
import {getCapabilities} from "@/api/capabilities";

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
  const router = useRouter();

  useEffect(() => {
    const formattedCapabilities = formatCapabilities(capabilities);
    setCapabilities(formattedCapabilities);
  }, [capabilities, setCapabilities, formatCapabilities]);

  const handleRegionSelect = (selectedRegion: string) => {
    setRegion(selectedRegion);
    setServer(''); // Reset server if region changes
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('server:', server);
    console.log('region:', region);
    console.log('character:', character);
    router.push('/dashboard');
  };

  return (
      <Layout>
        <Container
            header={<div>WoW Spent</div>}
            footer={
              <div>
                <p>&copy; 2024 WoW Spent. All rights reserved.</p>
                <p>Terms &amp; Conditions | Privacy Policy</p>
              </div>
            }
        >
          <section className={styles.intro}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
                label="Serveur:"
                filtrable={true}
                options={storedCapabilities && region !== '' ? storedCapabilities[region].map((server: ServerType) => ({ value: server.Slug, label: server.Name })) : []}
            />
            <Input
                id="character"
                type="text"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                required
                disabled={server === ''}
                label="Character:"
            />
            <Button type="submit" plain className={styles.button}>
              Search
            </Button>
          </form>
          <div className={styles.adContainer}>
            Placer publicité ici
          </div>
        </Container>
      </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    let capabilities = await getCapabilities('fr_FR');
    return {
      props: { capabilities },
    };
  } catch (error) {
    console.error('Failed to fetch capabilities:', error);
    return {
      props: { capabilities: null },
    };
  }
};

export default Login;