const supportedLanguages = ['en', 'fr'];

module.exports = {
    siteUrl: process.env.SITE_URL || 'https://spentonwow.com',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.7,
    sitemapSize: 5000,
    transform: async (config, path) => {
        return {
            loc: path,
            changefreq: 'daily',
            priority: 0.7,
            lastmod: new Date().toISOString(),
        };
    },
    additionalPaths: async (config) => {
        const paths = [];
        supportedLanguages.forEach((lang) => {
            paths.push({ loc: `/${lang}/confidentiality` });
            paths.push({ loc: `/${lang}/cookies` });
            paths.push({ loc: `/${lang}/dashboard` });
            paths.push({ loc: `/${lang}/error` });
            paths.push({ loc: `/${lang}/legal` });
            paths.push({ loc: `/${lang}` });
        });

        return paths;
    },
};
