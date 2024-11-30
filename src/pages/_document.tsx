// #file: pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <script
                    type="text/javascript"
                    src="https://wow.zamimg.com/widgets/power.js"
                    async
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                 var whTooltips = {
                   colorLinks: true,
                   iconizeLinks: true,
                   renameLinks: true
                 };
               `,
                    }}
                ></script>
                <script async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8080759371272999"
                        crossOrigin="anonymous"></script>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}