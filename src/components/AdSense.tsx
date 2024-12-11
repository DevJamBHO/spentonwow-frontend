import React, {useEffect} from 'react';

interface AdSenseProps {
    adSlot: string;
}

const AdSense: React.FC<AdSenseProps> = ({adSlot}) => {
    useEffect(() => {
        if (typeof window !== "undefined" && window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }, []);

    return (
        <>
            <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8080759371272999"
                crossOrigin="anonymous"
            ></script>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-8080759371272999"
                data-ad-slot={adSlot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </>
    );
};

export default AdSense;