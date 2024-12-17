import React, {useEffect} from 'react';

const AdSense: React.FC = () => {
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
                data-ad-slot="8629995218"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </>
    );
};

export default AdSense;