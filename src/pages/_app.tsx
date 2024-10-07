import '../styles/global.scss';
import PlausibleScript from '../components/PlausibleScript';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <PlausibleScript/>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp;