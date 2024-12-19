import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getLanguage } from '@/utils/language';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        const language = getLanguage();

        if (language && (router.pathname === '/' || router.pathname === '/index')) {
            router.replace(`/${language}`);
        } else {
            console.log('No redirection needed');
        }
    }, [router]);

    return null;
};

export default Home;