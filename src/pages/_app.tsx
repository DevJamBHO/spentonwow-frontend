// pages/_app.tsx
import '../styles/global.css'; // Importer le fichier CSS global
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;