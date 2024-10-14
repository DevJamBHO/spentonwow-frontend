import '../styles/global.scss';
import PlausibleScript from '../components/PlausibleScript';
import { AppProps } from 'next/app';
import {ModalProvider} from "@/context/ModalContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ModalProvider>
                <PlausibleScript/>
                <Component {...pageProps} />
            </ModalProvider>
        </>
    )
}

export default MyApp;