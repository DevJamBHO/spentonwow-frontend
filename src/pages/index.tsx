import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.scss';
import { GetServerSideProps } from "next";
import { getCapabilities } from "@/api/capabilities";
import useStore from '@/store/useStore';

interface LoginProps {
  capabilities: any;
}

interface serverType {
  Slug: string;
  Name: string;
  Region: string;
}

const Login: React.FC<LoginProps> = ({ capabilities }) => {
  const setCapabilities = useStore((state) => state.setCapabilities);
  const storedCapabilities = useStore((state) => state.capabilities);
  const formatCapabilities = useStore((state) => state.formatCapabilities);
  const [region, setRegion] = useState<string>('');
  const [server, setServer] = useState<string>('');
  const [character, setCharacter] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const formattedCapabilities = formatCapabilities(capabilities);
    setCapabilities(formattedCapabilities);
  }, [capabilities, setCapabilities, formatCapabilities]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('server:', server);
    console.log('region:', region);
    console.log('character:', character);

    router.push('/dashboard');
  };

  return (
      <div className={styles.container}>
        <div className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="region">Région :</label>
              <select
                  id="region"
                  required
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
              >
                <option></option>
                {storedCapabilities && Object.keys(storedCapabilities).map((region: string) => (
                    <option value={region} key={region}>
                      {region.toUpperCase()}
                    </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="server">Serveur :</label>
              <select
                  id="server"
                  required
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                  disabled={region === ''}
              >
                <option></option>
                {storedCapabilities && region !== '' && storedCapabilities[region].map((server: serverType) => (
                    <option value={server.Slug} key={server.Slug}>
                      {server.Name}
                    </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="character">Character :</label>
              <input
                  type="text"
                  id="character"
                  value={character}
                  onChange={(e) => setCharacter(e.target.value)}
                  required
                  disabled={server === ''}
              />
            </div>
            <button type="submit" className={styles.button}>
              Search
            </button>
          </form>
          {/* Emplacement pour la publicité */}
          <div className={styles.adContainer}>
            Placez la publicité ici
          </div>
        </div>
      </div>
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