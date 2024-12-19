import '../styles/global.scss';
import PlausibleScript from '../components/PlausibleScript';
import { AppProps } from 'next/app';
import {ModalProvider} from "@/context/ModalContext";
import {TranslationProvider} from "@/context/TranslationContext";
import {useEffect, useState} from "react";
import {getLanguage} from "@/utils/language";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";

function MyApp({ Component, pageProps }: AppProps) {

    const router = useRouter();
    const [clientLanguage, setClientLanguage] = useState<string | null>(null);

    useEffect(() => {
        const lang = getLanguage();
        setClientLanguage(lang);
        const pathParts = router.pathname.split('/');
        const currentLang = pathParts[1];
        const expectedPath = `/${lang}${router.pathname.replace(`/${currentLang}`, '')}`;
        const expectedUrl = {
            pathname: expectedPath,
            query: router.query,
        };

        if (router.asPath !== expectedPath && pathParts[1] !== '_error' && router.pathname !== '/404') {
            router.replace(expectedUrl).catch(console.error);
        }
    }, [router.asPath, router.pathname]);

    if (!clientLanguage) {
        return (
            <div className="loading-container">
                <Loading />
            </div>
        );
    }

    return (
        <>
            <ModalProvider>
                <TranslationProvider initialTranslations={pageProps.initialTranslations}>
                    <PlausibleScript/>
                    <Component {...pageProps} />
                </TranslationProvider>
            </ModalProvider>
        </>
    )
}

export default MyApp;